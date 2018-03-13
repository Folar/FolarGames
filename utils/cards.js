/**
 * Created by lawrenceackner on 3/2/18.
 */

class Cards {
    getBulls(item){


        switch (item.value){
            case 1:
                return "*";
            case 2:
                return "**";
            case 3:
                return "***";
            case 5:
                return "*****";
            case 7:
                return "*******";
        }
        return "";

    }
    getColor(item,hilite) {
        let color1="blue";
        let color2="blue";
        switch (item.value){

            case 1:

                color1 =  "#fefefe";
                color2 = "#cc46d6";
                break;

            case 2:
                color1 =  "#64fcff";
                color2 = "#224d06";

                break;
            case 3:
                color1 =  "#59eb2c";
                color2 = "#2214c7";

                break;
            case 5:
                color1 =  "#ab2424";
                color2 = "#59eb2c";
                break;

            case 7:
                color1 =  "#ebde26";
                color2 = "#ab2424";
                break;
        }
        if(hilite) {
            return color1;

        }else{
            return color2;
        }


    }
    getBackground(item,hilite) {
        let color1="blue";
        let color2="blue";
        switch (item.value){

            case 1:

                color1 =  "#fefefe";
                color2 = "#cc46d6";
                break;

            case 2:
                color1 =  "#64fcff";
                color2 = "#224d06";

                break;
            case 3:
                color1 =  "#59eb2c";
                color2 = "#2214c7";

                break;
            case 5:
                color1 =  "#ab2424";
                color2 = "#59eb2c";
                break;

            case 7:
                color1 =  "#ebde26";
                color2 = "#ab2424";
                break;
        }
        if(hilite) {
            return color2;

        }else{
            return color1;
        }


    }


}
module.exports = {Cards};