const MENU_ITEM_ID = "LatinWikiLookupMenuItem"

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    "id": MENU_ITEM_ID,
    "title": "Look up on Wiktionary",
    "contexts": ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener(
    (info, tab) => {
        if (info.menuItemId !== MENU_ITEM_ID) {
            return
        }
        const input = info.selectionText
        console.log('Input: ' + input)
        const fixedInput = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        console.log('Fixed Input: ' + fixedInput)
        const newURL = "https://en.wiktionary.org/wiki/" + fixedInput + "#Latin";
        chrome.tabs.create({ url: newURL });
    } 
)
