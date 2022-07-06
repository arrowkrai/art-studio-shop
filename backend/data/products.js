// Backup of the products array. Use mongodb for live site

const products = [
  {
    name: "Debonair Master Yi",
    image: "/images/178_Debonair_Master_Yi.jpg",
    price: 60,
    stock: 6,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Debonair Draven",
    image: "/images/177_Debonair_Draven.jpg",
    price: 60,
    stock: 6,
    rating: 5,
    numReviews: 3,
  },
  {
    name: "Debonair Zed",
    image: "/images/176_Debonair_Zed.jpg",
    price: 60,
    stock: 5,
    rating: 5,
    numReviews: 1,
  },
  {
    name: "Debonair Brand (Prestige Edition)",
    image: "/images/175_Debonair_Brand_(Prestige_Edition).jpg",
    price: 60,
    stock: 1,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Debonair Brand",
    image: "/images/174_Debonair_Brand.jpg",
    price: 60,
    stock: 4,
    rating: 5,
    numReviews: 1,
  },
  {
    name: "Dynasty Ahri",
    image: "/images/173_Dynasty_Ahri.jpg",
    price: 60,
    stock: 5,
    rating: 5,
    numReviews: 3,
  },
  {
    name: "Safari Caitlyn",
    image: "/images/172_Safari_Caitlyn.jpg",
    price: 60,
    stock: 2,
    rating: 5,
    numReviews: 1,
  },
  {
    name: "Sheriff Caitlyn",
    image: "/images/171_Sheriff_Caitlyn.jpg",
    price: 60,
    stock: 1,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Officer Caitlyn",
    image: "/images/170_Officer_Caitlyn.jpg",
    price: 60,
    stock: 5,
    rating: 4.5,
    numReviews: 3,
  },
  {
    name: "Arctic Warfare Caitlyn",
    image: "/images/169_Arctic_Warfare_Caitlyn.jpg",
    price: 60,
    stock: 4,
    rating: 5,
    numReviews: 1,
  },
  {
    name: "Resistance Caitlyn",
    image: "/images/168_Resistance_Caitlyn.jpg",
    price: 60,
    stock: 6,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Arcane Caitlyn",
    image: "/images/167_Arcane_Caitlyn.jpg",
    price: 60,
    stock: 2,
    rating: 5,
    numReviews: 3,
  },
  {
    name: "Cafe Cuties Vladimir",
    image: "/images/166_Cafe_Cuties_Vladimir.jpg",
    price: 60,
    stock: 5,
    rating: 5,
    numReviews: 1,
  },
  {
    name: "Cafe Cuties Bard",
    image: "/images/165_Cafe_Cuties_Bard.jpg",
    price: 60,
    stock: 2,
    rating: 5,
    numReviews: 2,
  },
  {
    name: "Cafe Cuties Annie",
    image: "/images/164_Cafe_Cuties_Annie.jpg",
    price: 60,
    stock: 4,
    rating: 4,
    numReviews: 1,
  },
  {
    name: "Cafe Cuties Soraka & Sivir",
    image: "/images/163_Cafe_Cuties_Soraka_&_Sivir.jpg",
    price: 60,
    stock: 6,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Cafe Cuties Gwen",
    image: "/images/162_Cafe_Cuties_Gwen.jpg",
    price: 60,
    stock: 4,
    rating: 5,
    numReviews: 2,
  },
  {
    name: "Arcane Jayce",
    image: "/images/161_Arcane_Jayce.jpg",
    price: 60,
    stock: 6,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Victorious Blitzcrank",
    image: "/images/160_Victorious_Blitzcrank.jpg",
    price: 60,
    stock: 0,
    rating: 5,
    numReviews: 2,
  },
  {
    name: "Duality Dragon Volibear (Prestige Edition)",
    image: "/images/159_Duality_Dragon_Volibear_(Prestige_Edition).jpg",
    price: 60,
    stock: 5,
    rating: 4.5,
    numReviews: 2,
  },
  {
    name: "Duality Dragon Volibear",
    image: "/images/158_Duality_Dragon_Volibear.jpg",
    price: 60,
    stock: 3,
    rating: 5,
    numReviews: 2,
  },
  {
    name: "Tranquility Dragon Karma",
    image: "/images/157_Tranquility_Dragon_Karma.jpg",
    price: 60,
    stock: 4,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Steel Dragon Thresh",
    image: "/images/156_Steel_Dragon_Thresh.jpg",
    price: 60,
    stock: 6,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Lagoon Dragon Kai'Sa",
    image: "/images/155_Lagoon_Dragon_Kai'Sa.jpg",
    price: 60,
    stock: 5,
    rating: 4,
    numReviews: 2,
  },
  {
    name: "Bewitching Morgana (Prestige Edition)",
    image: "/images/154_Bewitching_Morgana_(Prestige_Edition).jpg",
    price: 60,
    stock: 6,
    rating: 4.5,
    numReviews: 2,
  },
  {
    name: "Bewitching Yuumi",
    image: "/images/153_Bewitching_Yuumi.jpg",
    price: 60,
    stock: 6,
    rating: 5,
    numReviews: 3,
  },
  {
    name: "Bewitching Nami & Fiora",
    image: "/images/152_Bewitching_Nami_&_Fiora.jpg",
    price: 60,
    stock: 2,
    rating: 5,
    numReviews: 3,
  },
  {
    name: "Bewitching Syndra",
    image: "/images/151_Bewitching_Syndra.jpg",
    price: 60,
    stock: 6,
    rating: 5,
    numReviews: 3,
  },
  {
    name: "Worlds 2021 Jarvan IV",
    image: "/images/150_Worlds_2021_Jarvan_IV.jpg",
    price: 60,
    stock: 6,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Nightbringer Tryndamere",
    image: "/images/149_Nightbringer_Tryndamere.jpg",
    price: 60,
    stock: 2,
    rating: 5,
    numReviews: 2,
  },
  {
    name: "Dawnbringer Yone",
    image: "/images/148_Dawnbringer_Yone.jpg",
    price: 60,
    stock: 4,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Hextech Tristana",
    image: "/images/147_Hextech_Tristana.jpg",
    price: 60,
    stock: 2,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Dissonance of Pentakill Viego",
    image: "/images/146_Dissonance_of_Pentakill_Viego.jpg",
    price: 60,
    stock: 4,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Pentakill III Lost Chapter Mordekaiser, Karthus, and Sona",
    image: "/images/145_Pentakill_III_Lost_Chapter_Mordekaiser,_Karthus,_and_Sona.jpg",
    price: 60,
    stock: 6,
    rating: 4.5,
    numReviews: 3,
  },
  {
    name: "Pentakill III Lost Chapter Yorick, Kayle, and Olaf",
    image: "/images/144_Pentakill_III_Lost_Chapter_Yorick,_Kayle,_and_Olaf.jpg",
    price: 60,
    stock: 6,
    rating: 5,
    numReviews: 3,
  },
  {
    name: "Divine Phoenix Anivia",
    image: "/images/143_Divine_Phoenix_Anivia.jpg",
    price: 60,
    stock: 5,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Brave Phoenix Xayah",
    image: "/images/142_Brave_Phoenix_Xayah.jpg",
    price: 60,
    stock: 2,
    rating: 4.5,
    numReviews: 3,
  },
  {
    name: "Crime City Nightmare Zyra",
    image: "/images/141_Crime_City_Nightmare_Zyra.jpg",
    price: 60,
    stock: 4,
    rating: 5,
    numReviews: 1,
  },
  {
    name: "Crime City Nightmare Darius",
    image: "/images/140_Crime_City_Nightmare_Darius.jpg",
    price: 60,
    stock: 5,
    rating: 5,
    numReviews: 1,
  },
  {
    name: "Crime City Nightmare Twisted Fate",
    image: "/images/139_Crime_City_Nightmare_Twisted_Fate.jpg",
    price: 60,
    stock: 4,
    rating: 5,
    numReviews: 2,
  },
  {
    name: "Crime City Nightmare Shaco",
    image: "/images/138_Crime_City_Nightmare_Shaco.jpg",
    price: 60,
    stock: 2,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Crime City Nightmare Akali",
    image: "/images/137_Crime_City_Nightmare_Akali.jpg",
    price: 60,
    stock: 6,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Coven Leblanc (Prestige Edition)",
    image: "/images/136_Coven_Leblanc_(Prestige_Edition).jpg",
    price: 60,
    stock: 0,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Coven Ashe",
    image: "/images/135_Coven_Ashe.jpg",
    price: 60,
    stock: 6,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Coven Ahri",
    image: "/images/134_Coven_Ahri.jpg",
    price: 60,
    stock: 6,
    rating: 4,
    numReviews: 1,
  },
  {
    name: "Old God Warwick",
    image: "/images/133_Old_God_Warwick.jpg",
    price: 60,
    stock: 5,
    rating: 5,
    numReviews: 1,
  },
  {
    name: "Old God Malphite",
    image: "/images/132_Old_God_Malphite.jpg",
    price: 60,
    stock: 6,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Unbound Thresh",
    image: "/images/131_Unbound_Thresh.jpg",
    price: 60,
    stock: 6,
    rating: 5,
    numReviews: 3,
  },
  {
    name: "Cyber Pop Akshan",
    image: "/images/130_Cyber_Pop_Akshan.jpg",
    price: 60,
    stock: 6,
    rating: 4.5,
    numReviews: 3,
  },
  {
    name: "Sentinel Pyke",
    image: "/images/129_Sentinel_Pyke.jpg",
    price: 60,
    stock: 5,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Ascended Pantheon (Prestige Edition)",
    image: "/images/128_Ascended_Pantheon_(Prestige_Edition).jpg",
    price: 60,
    stock: 2,
    rating: 5,
    numReviews: 1,
  },
  {
    name: "Ruined Pantheon",
    image: "/images/127_Ruined_Pantheon.jpg",
    price: 60,
    stock: 5,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Sentinel Olaf",
    image: "/images/126_Sentinel_Olaf.jpg",
    price: 60,
    stock: 1,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Sentinel Riven",
    image: "/images/125_Sentinel_Riven.jpg",
    price: 60,
    stock: 4,
    rating: 5,
    numReviews: 1,
  },
  {
    name: "Astronaut Corki",
    image: "/images/124_Astronaut_Corki.jpg",
    price: 60,
    stock: 6,
    rating: 4.5,
    numReviews: 2,
  },
  {
    name: "Astronaut Veigar & Rammus",
    image: "/images/123_Astronaut_Veigar_&_Rammus.jpg",
    price: 60,
    stock: 6,
    rating: 5,
    numReviews: 1,
  },
  {
    name: "Astronaut Maokai",
    image: "/images/122_Astronaut_Maokai.jpg",
    price: 60,
    stock: 6,
    rating: 5,
    numReviews: 2,
  },
  {
    name: "Toxic Dr. Mundo",
    image: "/images/121_Toxic_Dr._Mundo.jpg",
    price: 60,
    stock: 2,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Rageborn Mundo",
    image: "/images/120_Rageborn_Mundo.jpg",
    price: 60,
    stock: 4,
    rating: 5,
    numReviews: 2,
  },
  {
    name: "Mundo Mundo",
    image: "/images/119_Mundo_Mundo.jpg",
    price: 60,
    stock: 5,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Executioner Mundo",
    image: "/images/118_Executioner_Mundo.jpg",
    price: 60,
    stock: 6,
    rating: 5,
    numReviews: 2,
  },
  {
    name: "Mr. Mundoverse",
    image: "/images/117_Mr._Mundoverse.jpg",
    price: 60,
    stock: 6,
    rating: 5,
    numReviews: 1,
  },
  {
    name: "Corporate Mundo",
    image: "/images/116_Corporate_Mundo.jpg",
    price: 60,
    stock: 4,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Pool Party Braum & Pool Party Sett",
    image: "/images/115_Pool_Party_Braum_&_Pool_Party_Sett.jpg",
    price: 60,
    stock: 5,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "PROJECT Varus",
    image: "/images/114_PROJECT_Varus.jpg",
    price: 60,
    stock: 4,
    rating: 5,
    numReviews: 2,
  },
  {
    name: "PROJECT Sylas (Prestige Edition)",
    image: "/images/113_PROJECT_Sylas_(Prestige_Edition).jpg",
    price: 60,
    stock: 4,
    rating: 5,
    numReviews: 2,
  },
  {
    name: "PROJECT Sylas",
    image: "/images/112_PROJECT_Sylas.jpg",
    price: 60,
    stock: 4,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "PROJECT Senna",
    image: "/images/111_PROJECT_Senna.jpg",
    price: 60,
    stock: 6,
    rating: 4,
    numReviews: 1,
  },
  {
    name: "PROJECT Renekton",
    image: "/images/110_PROJECT_Renekton.jpg",
    price: 60,
    stock: 3,
    rating: 5,
    numReviews: 1,
  },
  {
    name: "PROJECT Mordekaiser",
    image: "/images/109_PROJECT_Mordekaiser.jpg",
    price: 60,
    stock: 2,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "PROJECT Sejuani",
    image: "/images/108_PROJECT_Sejuani.jpg",
    price: 60,
    stock: 5,
    rating: 5,
    numReviews: 3,
  },
  {
    name: "Arcana Xerath",
    image: "/images/107_Arcana_Xerath.jpg",
    price: 60,
    stock: 4,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Arcana Tahm Kench",
    image: "/images/106_Arcana_Tahm_Kench.jpg",
    price: 60,
    stock: 3,
    rating: 4.5,
    numReviews: 3,
  },
  {
    name: "Conqueror Jax (Prestige Edition)",
    image: "/images/105_Conqueror_Jax_(Prestige_Edition).jpg",
    price: 60,
    stock: 5,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Conqueror Jax",
    image: "/images/104_Conqueror_Jax.jpg",
    price: 60,
    stock: 6,
    rating: 5,
    numReviews: 1,
  },
  {
    name: "Dragonslayer Twitch",
    image: "/images/103_Dragonslayer_Twitch.jpg",
    price: 60,
    stock: 6,
    rating: 5,
    numReviews: 2,
  },
  {
    name: "Dragon Guardian Galio and Dragonslayer Kayle",
    image: "/images/102_Dragon_Guardian_Galio_and_Dragonslayer_Kayle.jpg",
    price: 60,
    stock: 4,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Blackfrost Vel'Koz",
    image: "/images/101_Blackfrost_Vel'Koz.jpg",
    price: 60,
    stock: 4,
    rating: 5,
    numReviews: 1,
  },
  {
    name: "Blackfrost Sion",
    image: "/images/100_Blackfrost_Sion.jpg",
    price: 60,
    stock: 4,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Space Groove Samira",
    image: "/images/099_Space_Groove_Samira.jpg",
    price: 60,
    stock: 6,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Space Groove Blitz & Crank",
    image: "/images/098_Space_Groove_Blitz_&_Crank.jpg",
    price: 60,
    stock: 6,
    rating: 5,
    numReviews: 2,
  },
  {
    name: "Space Groove Nunu & Willump",
    image: "/images/097_Space_Groove_Nunu_&_Willump.jpg",
    price: 60,
    stock: 1,
    rating: 4,
    numReviews: 2,
  },
  {
    name: "Space Groove Nasus",
    image: "/images/096_Space_Groove_Nasus.jpg",
    price: 60,
    stock: 2,
    rating: 5,
    numReviews: 3,
  },
  {
    name: "Space Groove Rumble",
    image: "/images/095_Space_Groove_Rumble.jpg",
    price: 60,
    stock: 6,
    rating: 4,
    numReviews: 1,
  },
  {
    name: "Space Groove Lux",
    image: "/images/094_Space_Groove_Lux.jpg",
    price: 60,
    stock: 5,
    rating: 5,
    numReviews: 2,
  },
  {
    name: "Battle Academia Leona (Prestige Edition)",
    image: "/images/093_Battle_Academia_Leona_(Prestige_Edition).jpg",
    price: 60,
    stock: 5,
    rating: 5,
    numReviews: 2,
  },
  {
    name: "Battle Academia Leona",
    image: "/images/092_Battle_Academia_Leona.jpg",
    price: 60,
    stock: 5,
    rating: 5,
    numReviews: 2,
  },
  {
    name: "Battle Academia Yone",
    image: "/images/091_Battle_Academia_Yone.jpg",
    price: 60,
    stock: 2,
    rating: 5,
    numReviews: 1,
  },
  {
    name: "Battle Academia Caitlyn",
    image: "/images/090_Battle_Academia_Caitlyn.jpg",
    price: 60,
    stock: 2,
    rating: 4.5,
    numReviews: 2,
  },
  {
    name: "Battle Academia Garen & Wukong",
    image: "/images/089_Battle_Academia_Garen_&_Wukong.jpg",
    price: 60,
    stock: 4,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Beezahar",
    image: "/images/088_Beezahar.jpg",
    price: 60,
    stock: 2,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Withered Rose Syndra & Talon",
    image: "/images/087_Withered_Rose_Syndra_&_Talon.jpg",
    price: 60,
    stock: 5,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Crystal Rose Zyra & Swain",
    image: "/images/086_Crystal_Rose_Zyra_&_Swain.jpg",
    price: 60,
    stock: 3,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Lunar Beast Aphelios (Legendary)",
    image: "/images/085_Lunar_Beast_Aphelios_(Legendary).jpg",
    price: 60,
    stock: 5,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Lunar Beast Jarvan IV",
    image: "/images/084_Lunar_Beast_Jarvan_IV.jpg",
    price: 60,
    stock: 5,
    rating: 5,
    numReviews: 1,
  },
  {
    name: "Lunar Beast Darius",
    image: "/images/083_Lunar_Beast_Darius.jpg",
    price: 60,
    stock: 4,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Shan Hai Scrolls Cho'Gath",
    image: "/images/082_Shan_Hai_Scrolls_Cho'Gath.jpg",
    price: 60,
    stock: 2,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Shan Hai Scrolls Jhin",
    image: "/images/081_Shan_Hai_Scrolls_Jhin.jpg",
    price: 60,
    stock: 4,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Ruined Draven",
    image: "/images/080_Ruined_Draven.jpg",
    price: 60,
    stock: 4,
    rating: 5,
    numReviews: 1,
  },
  {
    name: "Ruined Karma",
    image: "/images/079_Ruined_Karma.jpg",
    price: 60,
    stock: 0,
    rating: 5,
    numReviews: 1,
  },
  {
    name: "Victorious Lucian",
    image: "/images/078_Victorious_Lucian.jpg",
    price: 60,
    stock: 6,
    rating: 5,
    numReviews: 2,
  },
  {
    name: "Marauder Kalista",
    image: "/images/077_Marauder_Kalista.jpg",
    price: 60,
    stock: 4,
    rating: 5,
    numReviews: 2,
  },
  {
    name: "Marauder Xin Zhao",
    image: "/images/076_Marauder_Xin_Zhao.jpg",
    price: 60,
    stock: 4,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Warden Gragas",
    image: "/images/075_Warden_Gragas.jpg",
    price: 60,
    stock: 4,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Warden Quinn",
    image: "/images/074_Warden_Quinn.jpg",
    price: 60,
    stock: 4,
    rating: 5,
    numReviews: 3,
  },
  {
    name: "Elderwood Xayah & Rakan",
    image: "/images/073_Elderwood_Xayah_&_Rakan.jpg",
    price: 60,
    stock: 4,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Battle Queen Janna",
    image: "/images/072_Battle_Queen_Janna.jpg",
    price: 60,
    stock: 6,
    rating: 5,
    numReviews: 2,
  },
  {
    name: "Battle Queen Diana",
    image: "/images/071_Battle_Queen_Diana.jpg",
    price: 60,
    stock: 6,
    rating: 5,
    numReviews: 1,
  },
  {
    name: "Battle Queen Katarina",
    image: "/images/070_Battle_Queen_Katarina.jpg",
    price: 60,
    stock: 5,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Dark Cosmic Lissandra",
    image: "/images/069_Dark_Cosmic_Lissandra.jpg",
    price: 60,
    stock: 5,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Cosmic Vladimir",
    image: "/images/068_Cosmic_Vladimir.jpg",
    price: 60,
    stock: 6,
    rating: 5,
    numReviews: 3,
  },
  {
    name: "Cosmic Varus",
    image: "/images/067_Cosmic_Varus.jpg",
    price: 60,
    stock: 3,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Cosmic Skarner",
    image: "/images/066_Cosmic_Skarner.jpg",
    price: 60,
    stock: 6,
    rating: 4.5,
    numReviews: 2,
  },
  {
    name: "Cosmic Nidalee",
    image: "/images/065_Cosmic_Nidalee.jpg",
    price: 60,
    stock: 6,
    rating: 5,
    numReviews: 1,
  },
  {
    name: "Cosmic Nami",
    image: "/images/064_Cosmic_Nami.jpg",
    price: 60,
    stock: 6,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Cosmic Illaoi",
    image: "/images/063_Cosmic_Illaoi.jpg",
    price: 60,
    stock: 4,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Cosmic Hecarim",
    image: "/images/062_Cosmic_Hecarim.jpg",
    price: 60,
    stock: 6,
    rating: 5,
    numReviews: 3,
  },
  {
    name: "Cosmic Anivia",
    image: "/images/061_Cosmic_Anivia.jpg",
    price: 60,
    stock: 6,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Odyssey Twisted Fate",
    image: "/images/060_Odyssey_Twisted_Fate.jpg",
    price: 60,
    stock: 5,
    rating: 5,
    numReviews: 3,
  },
  {
    name: "Odyssey Kha'Zix",
    image: "/images/059_Odyssey_Kha'Zix.jpg",
    price: 60,
    stock: 4,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Little Devil Fizz",
    image: "/images/058_Little_Devil_Fizz.jpg",
    price: 60,
    stock: 4,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Bewitching Elise",
    image: "/images/057_Bewitching_Elise.jpg",
    price: 60,
    stock: 6,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Pumpkin Prince Amumu",
    image: "/images/056_Pumpkin_Prince_Amumu.jpg",
    price: 60,
    stock: 4,
    rating: 4.5,
    numReviews: 2,
  },
  {
    name: "Obsidian Dragon Sett",
    image: "/images/055_Obsidian_Dragon_Sett.jpg",
    price: 60,
    stock: 6,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Eternal Dragon Brand",
    image: "/images/054_Eternal_Dragon_Brand.jpg",
    price: 60,
    stock: 4,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Championship Leblanc",
    image: "/images/053_Championship_Leblanc.jpg",
    price: 60,
    stock: 4,
    rating: 4.5,
    numReviews: 3,
  },
  {
    name: "Psy Ops Kayle",
    image: "/images/052_Psy_Ops_Kayle.jpg",
    price: 60,
    stock: 2,
    rating: 5,
    numReviews: 2,
  },
  {
    name: "Psy Ops Zed",
    image: "/images/051_Psy_Ops_Zed.jpg",
    price: 60,
    stock: 4,
    rating: 5,
    numReviews: 2,
  },
  {
    name: "Psy Ops Viktor",
    image: "/images/050_Psy_Ops_Viktor.jpg",
    price: 60,
    stock: 2,
    rating: 5,
    numReviews: 1,
  },
  {
    name: "Psy Ops Pyke",
    image: "/images/049_Psy_Ops_Pyke.jpg",
    price: 60,
    stock: 5,
    rating: 5,
    numReviews: 3,
  },
  {
    name: "Psy Ops Master Yi",
    image: "/images/048_Psy_Ops_Master_Yi.jpg",
    price: 60,
    stock: 6,
    rating: 5,
    numReviews: 3,
  },
  {
    name: "Psy Ops Shen",
    image: "/images/047_Psy_Ops_Shen.jpg",
    price: 60,
    stock: 2,
    rating: 5,
    numReviews: 1,
  },
  {
    name: "Psy Ops Vi",
    image: "/images/046_Psy_Ops_Vi.jpg",
    price: 60,
    stock: 1,
    rating: 5,
    numReviews: 1,
  },
  {
    name: "Spirit Blossom Cassiopeia",
    image: "/images/045_Spirit_Blossom_Cassiopeia.jpg",
    price: 60,
    stock: 5,
    rating: 5,
    numReviews: 3,
  },
  {
    name: "Spirit Blossom Lillia",
    image: "/images/044_Spirit_Blossom_Lillia.jpg",
    price: 60,
    stock: 6,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Infernal Vel'Koz",
    image: "/images/043_Infernal_Vel'Koz.jpg",
    price: 60,
    stock: 4,
    rating: 5,
    numReviews: 2,
  },
  {
    name: "Infernal Karthus & Kennen",
    image: "/images/042_Infernal_Karthus_&_Kennen.jpg",
    price: 60,
    stock: 5,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Conqueror Nautilus",
    image: "/images/041_Conqueror_Nautilus.jpg",
    price: 60,
    stock: 4,
    rating: 4.5,
    numReviews: 2,
  },
  {
    name: "Arcanist Kog'Maw",
    image: "/images/040_Arcanist_Kog'Maw.jpg",
    price: 60,
    stock: 4,
    rating: 4.5,
    numReviews: 3,
  },
  {
    name: "Pool Party Orianna & Taliyah",
    image: "/images/039_Pool_Party_Orianna_&_Taliyah.jpg",
    price: 60,
    stock: 5,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Pool Party Syndra, Heimerdinger, & Jarvan IV",
    image: "/images/038_Pool_Party_Syndra,_Heimerdinger,_&_Jarvan_IV.jpg",
    price: 60,
    stock: 5,
    rating: 5,
    numReviews: 1,
  },
  {
    name: "Hextech Nocturne",
    image: "/images/037_Hextech_Nocturne.jpg",
    price: 60,
    stock: 5,
    rating: 5,
    numReviews: 1,
  },
  {
    name: "Runeguard Volibear",
    image: "/images/036_Runeguard_Volibear.jpg",
    price: 60,
    stock: 5,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Northern Storm Volibear",
    image: "/images/035_Northern_Storm_Volibear.jpg",
    price: 60,
    stock: 4,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Thunder Lord Volibear",
    image: "/images/034_Thunder_Lord_Volibear.jpg",
    price: 60,
    stock: 4,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Astronaut Bard",
    image: "/images/033_Astronaut_Bard.jpg",
    price: 60,
    stock: 5,
    rating: 5,
    numReviews: 1,
  },
  {
    name: "Astronaut Gnar & Poppy",
    image: "/images/032_Astronaut_Gnar_&_Poppy.jpg",
    price: 60,
    stock: 6,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Pulsefire Ekko",
    image: "/images/031_Pulsefire_Ekko.jpg",
    price: 60,
    stock: 6,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Dark Candy Fiddlesticks",
    image: "/images/030_Dark_Candy_Fiddlesticks.jpg",
    price: 60,
    stock: 5,
    rating: 5,
    numReviews: 1,
  },
  {
    name: "Surprise Party Fiddlesticks",
    image: "/images/029_Surprise_Party_Fiddlesticks.jpg",
    price: 60,
    stock: 5,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Union Jack Fiddlesticks",
    image: "/images/028_Union_Jack_Fiddlesticks.jpg",
    price: 60,
    stock: 5,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Bandito Fiddlesticks",
    image: "/images/027_Bandito_Fiddlesticks.jpg",
    price: 60,
    stock: 3,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Dark Star Xerath",
    image: "/images/026_Dark_Star_Xerath.jpg",
    price: 60,
    stock: 5,
    rating: 5,
    numReviews: 2,
  },
  {
    name: "Dark Star Mordekaiser",
    image: "/images/025_Dark_Star_Mordekaiser.jpg",
    price: 60,
    stock: 6,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Dark Star Malphite",
    image: "/images/024_Dark_Star_Malphite.jpg",
    price: 60,
    stock: 2,
    rating: 4,
    numReviews: 2,
  },
  {
    name: "Talon Blackwood, Twitch Shadowfoot, Taric Luminshield",
    image: "/images/023_Talon_Blackwood,_Twitch_Shadowfoot,_Taric_Luminshield.jpg",
    price: 60,
    stock: 6,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Hextech Sejuani",
    image: "/images/022_Hextech_Sejuani.jpg",
    price: 60,
    stock: 6,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Blackfrost Rek'Sai",
    image: "/images/021_Blackfrost_Rek'Sai.jpg",
    price: 60,
    stock: 4,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Blackfrost Alistar & Renekton",
    image: "/images/020_Blackfrost_Alistar_&_Renekton.jpg",
    price: 60,
    stock: 4,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Blood Moon Katarina & Master Yi",
    image: "/images/019_Blood_Moon_Katarina_&_Master_Yi.jpg",
    price: 60,
    stock: 6,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Freljord Sylas",
    image: "/images/018_Freljord_Sylas.jpg",
    price: 60,
    stock: 4,
    rating: 5,
    numReviews: 2,
  },
  {
    name: "Dragon Slayer Trundle",
    image: "/images/017_Dragon_Slayer_Trundle.jpg",
    price: 60,
    stock: 6,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Mecha Kingdom Leona",
    image: "/images/016_Mecha_Kingdom_Leona.jpg",
    price: 60,
    stock: 0,
    rating: 5,
    numReviews: 2,
  },
  {
    name: "Mecha Kingdom Garen",
    image: "/images/015_Mecha_Kingdom_Garen.jpg",
    price: 60,
    stock: 4,
    rating: 5,
    numReviews: 2,
  },
  {
    name: "Dragonslayer Olaf & Diana",
    image: "/images/014_Dragonslayer_Olaf_&_Diana.jpg",
    price: 60,
    stock: 6,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Guardian of the Sands Janna, Ryze and Rengar",
    image: "/images/013_Guardian_of_the_Sands_Janna,_Ryze_and_Rengar.jpg",
    price: 60,
    stock: 3,
    rating: 5,
    numReviews: 2,
  },
  {
    name: "Sugar Rush Evelynn, Braum and Ziggs",
    image: "/images/012_Sugar_Rush_Evelynn,_Braum_and_Ziggs.jpg",
    price: 60,
    stock: 2,
    rating: 5,
    numReviews: 2,
  },
  {
    name: "Dawn Bringer Karma",
    image: "/images/011_Dawn_Bringer_Karma.jpg",
    price: 60,
    stock: 6,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Dawn Bringer Nidalee",
    image: "/images/010_Dawn_Bringer_Nidalee.jpg",
    price: 60,
    stock: 6,
    rating: 5,
    numReviews: 2,
  },
  {
    name: "Night Bringer Vladimir",
    image: "/images/009_Night_Bringer_Vladimir.jpg",
    price: 60,
    stock: 4,
    rating: 5,
    numReviews: 1,
  },
  {
    name: "Night Bringer Lee Sin",
    image: "/images/008_Night_Bringer_Lee_Sin.jpg",
    price: 60,
    stock: 6,
    rating: 5,
    numReviews: 3,
  },
  {
    name: "Pulsefire Thresh",
    image: "/images/007_Pulsefire_Thresh.jpg",
    price: 60,
    stock: 6,
    rating: 5,
    numReviews: 2,
  },
  {
    name: "High Noon Ashe",
    image: "/images/006_High_Noon_Ashe.jpg",
    price: 60,
    stock: 4,
    rating: 5,
    numReviews: 1,
  },
  {
    name: "High Noon Hecarim",
    image: "/images/005_High_Noon_Hecarim.jpg",
    price: 60,
    stock: 5,
    rating: 5,
    numReviews: 2,
  },
  {
    name: "High Noon Darius",
    image: "/images/004_High_Noon_Darius.jpg",
    price: 60,
    stock: 5,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Hextech Amumu",
    image: "/images/003_Hextech_Amumu.jpg",
    price: 60,
    stock: 2,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Infernal Varus, Shen and Galio",
    image: "/images/002_Infernal_Varus,_Shen_and_Galio.jpg",
    price: 60,
    stock: 4,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Majestic Empress Morgana",
    image: "/images/001_Majestic_Empress_Morgana.jpg",
    price: 60,
    stock: 6,
    rating: 0,
    numReviews: 0,
  },
];

export default products