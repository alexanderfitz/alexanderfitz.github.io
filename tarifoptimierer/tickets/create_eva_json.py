import pandas as pd
import requests
import json
import os
import time


# =============================
# Configuration
# =============================

GTFS_FOLDER = "gtfs_vmobil"

OUTPUT = "stations.json"


# Namen, die ÖBB anders kennt

OEBB_NAMES = {

    "Lauterach":
        "Lauterach in Vlbg",

    "St. Anton a.A.":
        "St. Anton am Arlberg",

    "Langen a.A.":
        "Langen am Arlberg",

}


# =============================
# Load GTFS stops
# =============================

stops = pd.read_csv(
    os.path.join(
        GTFS_FOLDER,
        "stops.txt"
    ),
    dtype=str
)


stop_names = (
    stops["stop_name"]
    .dropna()
    .unique()
)


print(
    "Stops:",
    len(stop_names)
)



# =============================
# ÖBB EVA search
# =============================

def search_eva(name):

    try:

        r = requests.get(
            "https://pv-apps.web.oebb.at/stations",
            params={
                "name": name,
                "t": int(time.time()*1000)
            },
            timeout=10
        )


        if r.status_code != 200:
            return None


        results = r.json()


        if len(results) == 0:
            return None



        # erster Treffer

        best = results[0]


        return {
            "eva": str(best["number"]),
            "oebb_name": (
                best["meta"]
                if best["meta"]
                else best["name"]
            )
        }


    except Exception as e:

        print(
            "Error:",
            name,
            e
        )

        return None



# =============================
# Create JSON
# =============================

stations = {}


for i, stop in enumerate(stop_names):

    search_name = OEBB_NAMES.get(
        stop,
        stop
    )


    print(
        f"{i+1}/{len(stop_names)}",
        stop,
        "->",
        search_name
    )


    result = search_eva(
        search_name
    )


    if result:

        stations[stop] = result

    else:

        print(
            "  Kein Treffer"
        )


    time.sleep(0.1)



# =============================
# Save
# =============================
 
with open(
    OUTPUT,
    "w",
    encoding="utf-8"
) as f:

    json.dump(
        stations,
        f,
        indent=2,
        ensure_ascii=False
    )


print()
print(
    "Gespeichert:",
    OUTPUT
)

print(
    "Treffer:",
    len(stations),
    "/",
    len(stop_names)
)
