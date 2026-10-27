import type { Vehicle } from "@/types";

// Sample vehicle list. In production this comes from the fitment data
// built from the supplier file (or TecDoc later).
export const vehicles: Vehicle[] = [
  { make: "Peugeot", model: "208", yearFrom: 2012, yearTo: 2019, bodyTypes: ["3 portes", "5 portes"], engines: ["1.2 PureTech 82ch", "1.2 PureTech 110ch", "1.6 BlueHDi 100ch"] },
  { make: "Peugeot", model: "308", yearFrom: 2013, yearTo: 2021, bodyTypes: ["5 portes", "Break"], engines: ["1.2 PureTech 130ch", "1.5 BlueHDi 130ch", "2.0 BlueHDi 150ch"] },
  { make: "Peugeot", model: "3008", yearFrom: 2016, yearTo: 2023, bodyTypes: ["SUV"], engines: ["1.2 PureTech 130ch", "1.6 THP 165ch", "2.0 BlueHDi 180ch"] },
  { make: "Renault", model: "Clio IV", yearFrom: 2012, yearTo: 2019, bodyTypes: ["5 portes", "Break"], engines: ["0.9 TCe 90ch", "1.2 TCe 120ch", "1.5 dCi 90ch"] },
  { make: "Renault", model: "Mégane IV", yearFrom: 2016, yearTo: 2023, bodyTypes: ["5 portes", "Break"], engines: ["1.3 TCe 140ch", "1.5 Blue dCi 115ch", "1.6 dCi 130ch"] },
  { make: "Renault", model: "Captur", yearFrom: 2013, yearTo: 2019, bodyTypes: ["SUV"], engines: ["0.9 TCe 90ch", "1.2 TCe 120ch", "1.5 dCi 110ch"] },
  { make: "Citroën", model: "C3", yearFrom: 2016, yearTo: 2023, bodyTypes: ["5 portes"], engines: ["1.2 PureTech 83ch", "1.2 PureTech 110ch", "1.5 BlueHDi 100ch"] },
  { make: "Volkswagen", model: "Golf 7", yearFrom: 2012, yearTo: 2019, bodyTypes: ["3 portes", "5 portes", "Break"], engines: ["1.0 TSI 110ch", "1.4 TSI 125ch", "1.6 TDI 110ch", "2.0 TDI 150ch"] },
  { make: "Volkswagen", model: "Polo", yearFrom: 2017, yearTo: 2023, bodyTypes: ["5 portes"], engines: ["1.0 MPI 80ch", "1.0 TSI 95ch", "1.6 TDI 95ch"] },
  { make: "BMW", model: "Série 3 (F30)", yearFrom: 2012, yearTo: 2018, bodyTypes: ["Berline", "Break"], engines: ["318d 150ch", "320d 190ch", "320i 184ch"] },
  { make: "Audi", model: "A3 (8V)", yearFrom: 2012, yearTo: 2020, bodyTypes: ["3 portes", "5 portes", "Berline"], engines: ["1.0 TFSI 116ch", "1.4 TFSI 150ch", "2.0 TDI 150ch"] },
  { make: "Toyota", model: "Yaris", yearFrom: 2011, yearTo: 2020, bodyTypes: ["3 portes", "5 portes"], engines: ["1.0 VVT-i 69ch", "1.5 Hybrid 100ch"] },
];

export const makes = Array.from(new Set(vehicles.map((v) => v.make))).sort();
