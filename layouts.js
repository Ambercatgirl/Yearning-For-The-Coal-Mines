var layouts = [
    [],
    [],
    []
]
function saveLayout(num) {
    if (setup.length < 76) {
        for (var i = 0; i < setup.length; i++) {
            layouts[num][i] = setup[i];
        }
        document.getElementById("layout" + num + "Items").innerHTML = layouts[num].length + "/75";
    }
}
function placeLayout(num, button) {
    if (layouts[num].length > 0) {
        button.disabled = true;
        withdrawAll();
        for (var i = 0; i < setup.length; i++) {
            setup[i].changePlaced(-1);
            setup[i].changeAmt(1);
        }
        slowLoad(num, button);
    }
}

const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time))
}
const sleep2 = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time))
}
  
const slowLoad = async (num, button) => {
    for (var i = 1; i < layouts[num].length - 1; i++) {
        if (layouts[num][i].amt > 0) {
           await sleep(25);
        setup.push(layouts[num][i])
        layouts[num][i].changeAmt(-1);
        layouts[num][i].changePlaced(1); 
        changeLengthDisplay();
        }
        
    }
    var temp;
    if (layouts[num][0].amt > 0) {
        temp = layouts[num][0];
        setup.splice(0, 0, temp);
        temp.changeAmt(-1);
        temp.changePlaced(1);
    } else {
        temp = items[locateItemIndex("basicdropper")];
        setup.splice(0, 0, temp);
        temp.changeAmt(-1);
        temp.changePlaced(1);
    }
    changeLengthDisplay();
    if (layouts[num][layouts[num].length - 1].amt > 0) {
        temp = layouts[num][layouts[num].length - 1];
        setup.push(temp);
        temp.changeAmt(-1);
        temp.changePlaced(1);
    } else {
        temp = items[locateItemIndex("basicprocessor")];
        setup.push(temp);
        temp.changeAmt(-1);
        temp.changePlaced(1);
    }
    changeLengthDisplay();
    var temp;
        hasDropper = false;
        hasFurnace = false;
        if (setup[0].usage == 'dropper') {
            hasDropper = true;
        }
        if (setup[setup.length - 1].usage = "processor") {
            hasFurnace = true;
        }
    setSetupValue();
    button.disabled = false;
  }
