import pandas as pd
from datetime import datetime, timedelta
import os
import json
import re


# =============================
# Configuration
# =============================

GTFS_FOLDER = "gtfs_vmobil"

STOP_PREFIXES = [
    "PLACE"
]

DATE = "DATE"


# =============================
# Load GTFS
# =============================

def load_gtfs(filename):
    return pd.read_csv(
        os.path.join(
            GTFS_FOLDER,
            filename
        ),
        dtype=str
    )


stops = load_gtfs("stops.txt")
stop_times = load_gtfs("stop_times.txt")
trips = load_gtfs("trips.txt")
routes = load_gtfs("routes.txt")
calendar = load_gtfs("calendar.txt")
calendar_dates = load_gtfs("calendar_dates.txt")


# =============================
# Helper
# =============================

def convert_gtfs_time(value, date):

    h, m, s = map(
        int,
        value.split(":")
    )

    base = datetime.strptime(
        date,
        "%Y-%m-%d"
    )

    return base + timedelta(
        hours=h,
        minutes=m,
        seconds=s
    )



# =============================
# Select stops
# =============================

# nur Anfang des Namens
# Regex sicher machen

pattern = "^(" + "|".join(
    re.escape(x)
    for x in STOP_PREFIXES
) + ")"


selected_stops = stops[
    stops["stop_name"].str.contains(
        pattern,
        case=False,
        regex=True,
        na=False
    )
][
    [
        "stop_id",
        "stop_name"
    ]
]


print(
    "Selected stops:",
    len(selected_stops)
)



# =============================
# Active services
# =============================

target = datetime.strptime(
    DATE,
    "%Y-%m-%d"
)



def get_services(day):

    date_string = day.strftime(
        "%Y%m%d"
    )

    weekday = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday"
    ][day.weekday()]


    active = set(
        calendar.loc[
            calendar[weekday] == "1",
            "service_id"
        ]
    )


    for _, row in calendar_dates[
        calendar_dates["date"] == date_string
    ].iterrows():

        if row["exception_type"] == "1":

            active.add(
                row["service_id"]
            )

        elif row["exception_type"] == "2":

            active.discard(
                row["service_id"]
            )


    return active



today_services = get_services(
    target
)


previous_day = target - timedelta(
    days=1
)


previous_services = get_services(
    previous_day
)



# =============================
# Create base departures
# =============================

base_departures = stop_times.merge(
    selected_stops,
    on="stop_id"
)


base_departures = base_departures.merge(
    trips[
        [
            "trip_id",
            "route_id",
            "service_id"
        ]
    ],
    on="trip_id"
)


base_departures = base_departures.merge(
    routes[
        [
            "route_id",
            "route_short_name"
        ]
    ],
    on="route_id"
)



# =============================
# Today departures
# =============================

today = base_departures[
    base_departures["service_id"].isin(
        today_services
    )
].copy()



if len(today) > 0:

    today["departure"] = today[
        "departure_time"
    ].apply(
        lambda x:
            convert_gtfs_time(
                x,
                DATE
            )
    )


    today = today[
        today["departure"].dt.date
        ==
        target.date()
    ]



# =============================
# Previous day overflow
# =============================

previous = base_departures[
    base_departures["service_id"].isin(
        previous_services
    )
].copy()



if len(previous) > 0:

    previous = previous[
        previous["departure_time"]
        .str.split(":")
        .str[0]
        .astype(int)
        >= 24
    ]


    if len(previous) > 0:

        previous["departure"] = previous[
            "departure_time"
        ].apply(
            lambda x:
                convert_gtfs_time(
                    x,
                    previous_day.strftime(
                        "%Y-%m-%d"
                    )
                )
        )


        previous = previous[
            previous["departure"].dt.date
            ==
            target.date()
        ]



# =============================
# Combine
# =============================

departures = pd.concat(
    [
        today,
        previous
    ],
    ignore_index=True
)


if len(departures) == 0:

    print(
        "Keine Abfahrten gefunden"
    )

    exit()



departures = departures[
    departures["departure"].dt.date
    ==
    target.date()
]



# =============================
# Find next stop
# =============================

stop_times["stop_sequence"] = (
    stop_times["stop_sequence"]
    .astype(int)
)


departures["stop_sequence"] = (
    departures["stop_sequence"]
    .astype(int)
)



possible_next = departures[
    [
        "trip_id",
        "stop_sequence"
    ]
].merge(
    stop_times[
        [
            "trip_id",
            "stop_sequence",
            "stop_id",
            "arrival_time"
        ]
    ],
    on="trip_id"
)



possible_next = possible_next[
    possible_next["stop_sequence_y"]
    >
    possible_next["stop_sequence_x"]
]



possible_next = (
    possible_next
    .sort_values(
        [
            "trip_id",
            "stop_sequence_x",
            "stop_sequence_y"
        ]
    )
    .drop_duplicates(
        [
            "trip_id",
            "stop_sequence_x"
        ]
    )
)



possible_next = possible_next.merge(
    stops[
        [
            "stop_id",
            "stop_name"
        ]
    ],
    on="stop_id",
    how="left"
)



possible_next = possible_next.rename(
    columns={
        "stop_sequence_x": "stop_sequence",
        "stop_name": "next_stop",
        "arrival_time": "arrival_time_next"
    }
)



departures = departures.merge(
    possible_next[
        [
            "trip_id",
            "stop_sequence",
            "next_stop",
            "arrival_time_next"
        ]
    ],
    on=[
        "trip_id",
        "stop_sequence"
    ],
    how="left"
)



# =============================
# Keep only matching next stops
# =============================

next_pattern = "^(" + "|".join(
    re.escape(x)
    for x in STOP_PREFIXES
) + ")"


departures = departures[
    departures["next_stop"].str.contains(
        next_pattern,
        case=False,
        regex=True,
        na=False
    )
]



# =============================
# Output
# =============================

result = departures[
    [
        "stop_name",
        "departure",
        "route_short_name",
        "next_stop",
        "arrival_time_next"
    ]
]


result = result.rename(
    columns={
        "route_short_name": "line"
    }
)


result = result.sort_values(
    "departure"
)



print()

print(
    result.to_string(
        index=False
    )
)



result.to_json(
    "departures.json",
    orient="records",
    indent=2,
    date_format="iso",
    force_ascii=False
)


print()

print(
    "Saved departures.json"
)
