const fs = require('fs');

async function extractContenue() {

  const rawData = fs.readFileSync('file.json'); // You can find this (FortniteGame/Content/Items/Datatables/AthenaLootPackages_Client.uasset) (in FModel) and just copy paste there
  const data = JSON.parse(rawData);

  const rows = data[0].Rows;
  let extractedValues = '';

  for (const key in rows) {
    const row = rows[key];
    const itemDefinition = row.ItemDefinition; // Item Path
    const count = row.Count; // Item Count
    const weight = row.Weight; // Item Weight
    const lootPackage = row.LootPackageID; // Item Type

    let splitpoint = lootPackage.split(".");
    let resultloot = splitpoint[1];

    if (typeof itemDefinition === 'string' && itemDefinition.startsWith("/Game/")) // Only for season 0 & 1
    {
      extractedValues += `${itemDefinition}|${count}|${weight}|${resultloot}\n`;
    } 
    else 
    {
      const itemDefinition = row.ItemDefinition.AssetPathName;

      if (typeof itemDefinition === 'string' && !itemDefinition.startsWith("None")) // Only for other seasons
      {
        extractedValues += `${itemDefinition}|${count}|${weight}|${resultloot}\n`;
      } 
    }
  }

  fs.writeFile('result/extract-file.txt', extractedValues, (err) => {
    if (err) throw err;
    console.log('The files have been created successfully!');
  });
}

extractContenue();