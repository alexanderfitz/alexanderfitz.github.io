const PREISE = {
  LOKAL: {
    vollpreis: 2.40,
    kind: 1.20
  },
  REGIO: {
    vollpreis: 4.80,
    kind: 2.40
  },
  MAXIMO: {
    vollpreis: 9.60,
    kind: 4.80
  }
};

// ================= LOKAL =================
const lokal = {
"Alberschwende*54_0":["Alberschwende","Müselbach","Dornbirn","Ebnit","Bödele","Bildstein","Buch","Egg","Großdorf","Schetteregg","Bersbuch","Andelsbuch","Schwarzenberg"],
"Au*47_0":["Au","Schoppernau","Schnepfau","Hirschau"],
"Bartholomäberg*35_0":["Bartholomäberg","Gantschier","Innerberg","Schruns","Kaltenbrunnen","Latschau","Golmerbahn","Tschagguns","St. Anton i.M.","Lorüns","Vandans"],
"Bezau*53_0":["Bezau","Bizau","Reuthe","Mellau","Schwarzenberg","Andelsbuch","Egg","Großdorf","Schetteregg","Bersbuch"],
"Bildstein*3_0":["Bildstein","Buch","Alberschwende","Müselbach","Kennelbach","Lauterach","Wolfurt","Schwarzach"],
"Blons*28_0":["Blons","St. Gerold","Thüringerberg","Sonntag","Buchboden","Raggal","Marul"],
"Bludenz*23_0":["Bludenz","Bings","Nüziders","Ludesch","Thüringen","Gais","Bludesch","Bürs","Bürserberg","Stallehr","Innerbraz","Braz","Lorüns","St. Anton i.M.","Vandans"],
"Brand*32_0":["Brand","Lünerseebahn","Bürserberg"],
"Bregenz*1_0":["Bregenz","Fluh","Lochau","Pfänder","Hörbranz","Langen b.B.","Kennelbach","Lauterach","Wolfurt","Schwarzach","Hard","Fußach"],
"Dalaas*40_0":["Dalaas","Wald a.A.","Klösterle","Danöfen","Stuben","Rauz","Langen a.A.","Innerbraz","Braz"],
"Damüls*51_0":["Damüls","Fontanella","Faschina","Laterns","Innerlaterns"],
"Doren*60_0":["Doren","Sulzberg","Fahl","Thal","Langen b.B.","Krumbach","Riefensberg"],
"Dornbirn*10_0":["Dornbirn","Ebnit","Bödele","Schwarzach","Wolfurt","Lauterach","Kennelbach","Lustenau","Brugg","Hohenems","Emsreute","Schuttannen","Kreiers Alp","Alberschwende","Müselbach"],
"Dünserberg*65_0":["Dünserberg","Älpele","Düns","Schnifis","Röns"],
"Egg*52_0":["Egg","Großdorf","Schetteregg","Bersbuch","Andelsbuch","Schwarzenberg","Bezau","Bizau","Reuthe","Lingenau","Langenegg","Hittisau","Bolgenach","Alberschwende","Müselbach"],
"Eichenberg*9_0":["Eichenberg","Möggers","Scheidegg","Lochau","Pfänder","Hörbranz"],
"Feldkirch*14_1":["Feldkirch","Brederis","Meiningen","Klaus","Weiler","Sulz","Röthis","Zwischenwasser","Rankweil","Muntlix","Dafins","Batschuns","Göfis","Frastanz","Gurtis","Amerlügen","Satteins","Röns"],
"Fontanella*66_0":["Fontanella","Faschina","Damüls","Sonntag","Buchboden"],
"Frastanz*22_0":["Frastanz","Gurtis","Amerlügen","Satteins","Göfis","Feldkirch","Röns","Düns","Schnifis","Schlins","Nenzing","Beschling","Bludesch"],
"Fraxern*17_0":["Fraxern","Klaus","Weiler","Sulz","Röthis","Rankweil","Muntlix","Dafins","Batschuns","Zwischenwasser"],
"Gaschurn*38_0":["Gaschurn","Partenen","St. Gallenkirch","Gortipohl","Gargellen"],
"Göfis*21_0":["Göfis","Feldkirch","Rankweil","Muntlix","Dafins","Batschuns","Zwischenwasser","Sulz","Röthis","Klaus","Weiler","Frastanz","Gurtis","Amerlügen","Satteins","Röns"],
"Götzis*12_0":["Götzis","Millrütte","Koblach","Mäder","Altach","Hohenems","Emsreute","Schuttannen","Kreiers Alp","Meiningen","Klaus","Weiler","Sulz","Röthis","Zwischenwasser","Rankweil","Muntlix","Dafins","Batschuns"],
"Hard*4_0":["Hard","Fußach","Höchst","Gaißau","Bregenz","Fluh","Kennelbach","Lauterach","Wolfurt","Schwarzach","Lustenau","Brugg","St. Margrethen"],
"Höchst*5_0":["Höchst","Gaißau","Fußach","Lustenau","Brugg","Hard","St. Margrethen"],
"Hohenems*11_0":["Hohenems","Emsreute","Schuttannen","Kreiers Alp","Dornbirn","Ebnit","Bödele","Lustenau","Brugg","Altach","Mäder","Koblach","Götzis","Millrütte"],
"Hohenweiler*7_0":["Hohenweiler","Niederstaufen","Möggers","Scheidegg","Hörbranz","Lochau","Pfänder"],
"Innerbraz*39_0":["Innerbraz","Braz","Stallehr","Bludenz","Bings","Bürs","Nüziders","Dalaas","Wald a.A."],
"Klösterle*41_0":["Klösterle","Danöfen","Stuben","Rauz","Langen a.A.","Dalaas","Wald a.A."],
"Krumbach*56_0":["Krumbach","Riefensberg","Doren","Langenegg","Hittisau","Bolgenach","Lingenau"],
"Langen b.B.*58_0":["Langen b.B.","Bregenz","Fluh","Doren"],
"Langenegg*55_0":["Langenegg","Hittisau","Bolgenach","Sibratsgfäll","Lingenau","Egg","Großdorf","Schetteregg","Bersbuch","Andelsbuch","Schwarzenberg","Krumbach","Riefensberg"],
"Laterns*19_0":["Laterns","Innerlaterns","Rankweil","Muntlix","Dafins","Batschuns","Zwischenwasser","Sulz","Röthis","Klaus","Weiler","Damüls"],
"Lauterach*2_0":["Lauterach","Wolfurt","Bregenz","Fluh","Kennelbach","Schwarzach","Bildstein","Buch","Hard","Fußach","Dornbirn","Ebnit","Bödele"],
"Lech*42_0":["Lech a.A.","Zürs","Warth","Hochkrumbach"],
"Lindau*61_0":["Lindau","Hörbranz","Lochau","Pfänder"],
"Lochau*6_0":["Lochau","Pfänder","Hörbranz","Eichenberg","Hohenweiler","Bregenz","Fluh","Lindau"],
"Lustenau*13_0":["Lustenau","Brugg","Hohenems","Emsreute","Schuttannen","Kreiers Alp","Dornbirn","Ebnit","Bödele","Hard","Fußach","Gaißau","Höchst","St. Margrethen"],
"Meiningen*15_1":["Meiningen","Koblach","Mäder","Götzis","Millrütte","Altach","Brederis","Rankweil","Muntlix","Dafins","Batschuns","Sulz","Röthis","Klaus","Weiler","Feldkirch"],
"Mellau*45_0":["Mellau","Schnepfau","Hirschau","Reuthe","Bizau","Bezau"],
"Möggers*8_0":["Möggers","Hohenweiler","Scheidegg","Weiler i.A.","Eichenberg"],
"Nenzing*25_0":["Nenzing","Beschling","Schlins","Satteins","Röns","Düns","Schnifis","Frastanz","Gurtis","Amerlügen","Bludesch","Thüringen","Gais","Ludesch"],
"Niederstaufen*62_0":["Niederstaufen","Hohenweiler"],
"Oberstaufen*69_0":["Oberstaufen","Aach i.A."],
"Raggal*29_0":["Raggal","Marul","Thüringen","Gais","Ludesch","Bludesch","Blons","St. Gerold","Sonntag","Buchboden"],
"Rankweil*16_0":["Rankweil","Muntlix","Dafins","Batschuns","Göfis","Feldkirch","Brederis","Meiningen","Koblach","Mäder","Götzis","Millrütte","Altach","Viktorsberg","Fraxern","Laterns","Innerlaterns","Zwischenwasser"],
"Scheidegg*67_0":["Scheidegg","Möggers","Eichenberg","Hohenweiler","Weiler i.A."],
"Schnepfau*46_0":["Schnepfau","Hirschau","Mellau","Au"],
"Schnifis*64_0":["Schnifis","Röns","Satteins","Frastanz","Gurtis","Amerlügen","Düns","Dünserberg","Älpele","Thüringerberg","St. Gerold","Schlins","Nenzing","Beschling"],
"Schoppernau*48_0":["Schoppernau","Au","Schröcken"],
"Schröcken*49_0":["Schröcken","Warth","Hochkrumbach","Schoppernau"],
"Schruns*33_0":["Schruns","Kaltenbrunnen","Latschau","Golmerbahn","Tschagguns","Silbertal","St. Gallenkirch","Gortipohl","Gargellen","Bartholomäberg","Gantschier","Innerberg","Vandans","St. Anton i.M.","Lorüns"],
"Sibratsgfäll*59_0":["Sibratsgfäll","Hittisau","Bolgenach","Lingenau","Langenegg"],
"Silbertal*36_0":["Silbertal","Schruns","Kaltenbrunnen","Latschau","Golmerbahn","Tschagguns"],
"Sonntag*30_0":["Sonntag","Buchboden","Fontanella","Faschina","Blons","St. Gerold","Raggal","Marul"],
"St. Anton a.A.*44_0":["St. Anton a.A.","St. Christoph"],
"St. Anton i.M.*34":["St. Anton i.M.","Lorüns","Bludenz","Bings","Bürs","Nüziders","Vandans","Bartholomäberg","Gantschier","Innerberg","Schruns","Kaltenbrunnen","Latschau","Golmerbahn","Tschagguns"],
"St. Christoph*43_0":["St. Christoph","St. Anton a.A."],
"St. Gallenkirch*37_0":["St. Gallenkirch","Gortipohl","Gargellen","Gaschurn","Partenen","Schruns","Kaltenbrunnen","Latschau","Golmerbahn","Tschagguns"],
"St. Gerold*27_0":["St. Gerold","Blons","Sonntag","Buchboden","Raggal","Marul","Bludesch","Ludesch","Thüringen","Gais","Thüringerberg","Schnifis","Düns","Röns"],
"St. Margrethen*63_0":["St. Margrethen","Lustenau","Brugg","Hard","Fußach","Höchst","Gaißau"],
"Sulzberg*57_0":["Sulzberg","Fahl","Thal","Doren"],
"Thüringen*24_0":["Thüringen","Gais","Thüringerberg","St. Gerold","Bludesch","Nenzing","Beschling","Schlins","Raggal","Marul","Ludesch","Nüziders","Bludenz","Bings","Bürs"],
"Thüringerberg*26_0":["Thüringerberg","St. Gerold","Blons","Düns","Schnifis","Röns","Thüringen","Gais","Ludesch","Bludesch"],
"Übersaxen*20_0":["Übersaxen","Zwischenwasser","Rankweil","Muntlix","Dafins","Batschuns","Sulz","Röthis","Klaus","Weiler"],
"Viktorsberg*18_0":["Viktorsberg","Rankweil","Muntlix","Dafins","Batschuns","Zwischenwasser","Sulz","Röthis","Klaus","Weiler"],
"Warth*50_0":["Warth","Hochkrumbach","Lech a.A.","Zürs","Schröcken"],
"Weiler i.A.*68_0":["Weiler i.A.","Scheidegg","Möggers"]
};

// ================= REGIO =================
const regio = {
"Leiblachtal*1_0":["Bregenz","Fluh","Eichenberg","Hohenweiler","Hörbranz","Lindau","Lochau","Pfänder","Möggers","Niederstaufen","Scheidegg","Weiler i.A."],
"Vorderwald*2_0":["Aach i.A.","Alberschwende","Müselbach","Andelsbuch","Bezau","Bildstein","Bizau","Bregenz","Fluh","Buch","Doren","Dornbirn","Egg","Großdorf","Schetteregg","Bersbuch","Hittisau","Bolgenach","Kennelbach","Krumbach","Langen b.B.","Langenegg","Lauterach","Lingenau","Oberstaufen","Reuthe","Riefensberg","Scheidegg","Schwarzach","Schwarzenberg","Sibratsgfäll","Sulzberg","Fahl","Thal","Weiler i.A.","Wolfurt"],
"Hofsteig/Rheindelta*3_0":["Bildstein","Bregenz","Fluh","Brugg","Buch","Bödele","Dornbirn","Ebnit","Fußach","Gaißau","Hard","Höchst","Kennelbach","Lauterach","Lustenau","Schwarzach","St. Margrethen","Wolfurt"],
"Mittleres Rheintal*4_0":["Altach","Brugg","Bödele","Dornbirn","Ebnit","Götzis","Hohenems","Emsreute","Koblach","Kreiers Alp","Lustenau","Millrütte","Mäder","Schuttannen"],
"Hinterwald*5_0":["Au","Bezau","Bizau","Damüls","Gurtis","Hochkrumbach","Lech a.A.","Mellau","Reuthe","Schnepfau","Hirschau","Schoppernau","Schröcken","Schönenbach","Steeg i.T.","Warth","Zürs"],
"Vorderland*6_0":["Altach","Batschuns","Brederis","Dafins","Damüls","Feldkirch","Fraxern","Göfis","Götzis","Innerlaterns","Klaus","Koblach","Laterns","Meiningen","Millrütte","Muntlix","Mäder","Rankweil","Röthis","Sulz","Viktorsberg","Weiler","Zwischenwasser","Übersaxen"],
"Walgau/Gr. Walsertal*7_0":["Amerlügen","Bings","Blons","Bludenz","Bludesch","Buchboden","Bürs","Damüls","Düns","Dünserberg","Älpele","Faschina","Feldkirch","Fontanella","Frastanz","Gais","Gurtis","Laguzalpe","Ludesch","Marul","Nenzing","Beschling","Nüziders","Raggal","Röns","Satteins","Schlins","Schnifis","Sonntag","St. Gerold","Stallehr","Thüringen","Thüringerberg","Älpele"],
"Klostertal/Arlberg*8_0":["Bings","Bludenz","Braz","Bürs","Dalaas","Innerbraz","Klösterle","Danöfen","Langen a.A.","Lech a.A.","Nüziders","Rauz","St. Anton a.A.","St. Christoph","Stallehr","Stuben","Wald a.A.","Zürs"],
"Montafon/Brandnertal*9_0":["Bartholomäberg","Gantschier","Bielerhöhe","Bings","Bludenz","Brand","Bürs","Bürserberg","Gargellen","Gaschurn","Innerberg","Kops Zeinisjoch","Latschau","Golmerbahn","Lorüns","Lünerseebahn","Nüziders","Partenen","Schruns","Kaltenbrunnen","Silbertal","St. Anton i.M.","St. Gallenkirch","Gortipohl","Stallehr","Tschagguns","Vandans","Wirl"]
};