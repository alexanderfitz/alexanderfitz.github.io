import subprocess
import os


# =============================
# Configuration
# =============================

DATE = "2026-07-17"


PLACES = {
    "Alberschwende": ["Alberschwende"],
    "Au": ["Au"],
    "Bartholomäberg": ["Bartholomäberg"],
    "Bezau": ["Bezau"],
    "Bildstein": ["Bildstein"],
    "Blons": ["Blons"],
    "Bludenz": ["Bludenz"],
    "Brand": ["Brand"],
    "Bregenz": ["Bregenz"],
    "Dalaas": ["Dalaas"],
    "Damüls": ["Damüls"],
    "Doren": ["Doren"],
    "Dornbirn": ["Dornbirn"],
    "Dünserberg": ["Dünserberg"],
    "Egg": ["Egg"],
    "Eichenberg": ["Eichenberg"],
    "Feldkirch": ["Feldkirch"],
    "Fontanella": ["Fontanella"],
    "Frastanz": ["Frastanz"],
    "Fraxern": ["Fraxern"],
    "Gaschurn": ["Gaschurn"],
    "Göfis": ["Göfis"],
    "Götzis": ["Götzis"],
    "Hard": ["Hard"],
    "Höchst": ["Höchst"],
    "Hohenems": ["Hohenems"],
    "Hohenweiler": ["Hohenweiler"],
    "Innerbraz": ["Innerbraz"],
    "Klösterle": ["Klösterle"],
    "Krumbach": ["Krumbach"],
    "Langen b.B.": ["Langen"],
    "Langenegg": ["Langenegg"],
    "Laterns": ["Laterns"],
    "Lauterach": ["Lauterach"],
    "Lech": ["Lech"],
    "Lindau": ["Lindau"],
    "Lochau": ["Lochau"],
    "Lustenau": ["Lustenau"],
    "Meiningen": ["Meiningen"],
    "Mellau": ["Mellau"],
    "Möggers": ["Möggers"],
    "Nenzing": ["Nenzing"],
    "Niederstaufen": ["Niederstaufen"],
    "Oberstaufen": ["Oberstaufen"],
    "Raggal": ["Raggal"],
    "Rankweil": ["Rankweil"],
    "Scheidegg": ["Scheidegg"],
    "Schnepfau": ["Schnepfau"],
    "Schnifis": ["Schnifis"],
    "Schoppernau": ["Schoppernau"],
    "Schröcken": ["Schröcken"],
    "Schruns": ["Schruns"],
    "Sibratsgfäll": ["Sibratsgfäll"],
    "Silbertal": ["Silbertal"],
    "Sonntag": ["Sonntag"],
    "St. Anton a.A.": ["St. Anton a.A.", "St. Anton a. A.", "St.Anton a.A.", "St. Anton am Arlberg"],
    "St. Anton i.M.": ["St. Anton i.M.", "St. Anton im Montafon"],
    "St. Christoph": ["St. Christoph"],
    "St. Gallenkirch": ["St. Gallenkirch"],
    "St. Gerold": ["St. Gerold"],
    "St. Margrethen": ["St. Margrethen"],
    "Sulzberg": ["Sulzberg"],
    "Thüringen": ["Thüringen"],
    "Thüringerberg": ["Thüringerberg"],
    "Übersaxen": ["Übersaxen"],
    "Viktorsberg": ["Viktorsberg"],
    "Warth": ["Warth"],
    "Weiler i.A.": ["Weiler i.A.","Weiler i. A.","Weiler im Allgäu"]
}


# =============================
# Output folder
# =============================

date_folder = os.path.join(
    "departures",
    DATE
)

os.makedirs(
    date_folder,
    exist_ok=True
)


# =============================
# Run generator
# =============================

for place, names in PLACES.items():

    print()
    print("=============================")
    print("Processing:", place)
    print("Date:", DATE)
    print("=============================")


    with open(
        "departure_generator.py",
        "r",
        encoding="utf-8"
    ) as f:
        code = f.read()


    prefixes = ",\n    ".join(
        f'"{name}"'
        for name in names
    )


    code = code.replace(
        'STOP_PREFIXES = [\n    "PLACE"\n]',
        f'STOP_PREFIXES = [\n    {prefixes}\n]'
    )


    code = code.replace(
        'DATE = "DATE"',
        f'DATE = "{DATE}"'
    )


    with open(
        "temp_departure_generator.py",
        "w",
        encoding="utf-8"
    ) as f:
        f.write(code)


    result = subprocess.run(
        [
            "python",
            "temp_departure_generator.py"
        ],
        capture_output=True,
        text=True
    )


    if result.returncode != 0:

        print()
        print("FEHLER in", place)
        print("-----------------------------")
        print(result.stdout)
        print(result.stderr)
        print("-----------------------------")

        raise SystemExit(1)


    output_file = os.path.join(
        date_folder,
        f"{place}.json"
    )

    # alte Datei löschen, falls vorhanden

    if os.path.exists(output_file):
        os.remove(output_file)


    if os.path.exists("departures.json"):

        os.replace(
            "departures.json",
            output_file
        )

    else:

        print(
            "Keine departures.json erzeugt - erstelle leere Datei"
        )

        with open(
            output_file,
            "w",
            encoding="utf-8"
        ) as f:

            f.write("[]")


    os.remove(
        "temp_departure_generator.py"
    )


print()
print("Finished all places.")
