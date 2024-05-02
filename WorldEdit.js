
var activated = false;

var selection1 = [0,0,0];

var first = false;

var selection2 = [0,0,0];

var second = false;

function newLevel(){
    
    activated = false;
    
    first = false;
    
    second = false;
}

function procCmd(c){
    var cmd = c.split(" ");
    
    if(cmd[0] == "/wand"){
        if(activated == false){
            clientMessage(ChatColor.GREEN + "ON!");
            activated = true;
        }
        else {
            clientMessage(ChatColor.RED + "OFF!");
            activated = false;
        }
    }

    // Functions
    if(cmd[0] == "/set" && activated == false){
        clientMessage("You need to activate the //wand to set the blocks");
    }
    if(cmd[0] == "/set" && activated == true && second == false){
        clientMessage("Please select two positions");
    }
    if(cmd[0] == "/set" && activated == true && second == true){
        var startX = _mathMin(selection1[0], selection2[0]);
        var endX = _mathMax(selection1[0], selection2[0]);
        var startY = _mathMin(selection1[1], selection2[1]);
        var endY = _mathMax(selection1[1], selection2[1]);
        var startZ = _mathMin(selection1[2], selection2[2]);
        var endZ = _mathMax(selection1[2], selection2[2]);
        
        for(var x = startX; x <= endX; x++){
            for(var y = startY; y <= endY; y++){
                for(var z = startZ; z <= endZ; z++){
                    setTile(x,y,z,Player.getCarriedItem(),Player.getCarriedItemData());
                }
            }
        }
        clientMessage("Set blocks to " + Player.getCarriedItem() + ":" + Player.getCarriedItemData());
    }
}

function useItem(x, y, z, item, block, side, itemDamage, blockDamage){
    if(item == 271 && activated == false){
        clientMessage("Set the first position");
    }
    if(item == 271 && activated == true){
        if(!first){
            first = true;
            selection1[0] = Math.round(x);
            selection1[1] = Math.round(y);
            selection1[2] = Math.round(z);
            clientMessage("First position set!");
            clientMessage("Now set the second position!");
        }
        else if(!second){
            second = true;
            selection2[0] = Math.round(x);
            selection2[1] = Math.round(y);
            selection2[2] = Math.round(z);
            clientMessage("Second position set!");
        }
        else{
            first = false;
            second = false;
            clientMessage("You have exited set mode");
        }
    }
}

function _mathMin(first, second){
    return first < second ? first : second;
}

function _mathMax(first, second){
    return first > second ? first : second;
}