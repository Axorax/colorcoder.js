export const colorcoder = {
    "rgb": {
        "hex": (r,g,b) => {
            r = r.toString(16);g = g.toString(16);b = b.toString(16);
            if (r.length == 1) r = "0" + r;
            if (g.length == 1) g = "0" + g;
            if (b.length == 1)b = "0" + b;
            return r + g + b;
        },

        "hsl": (r,g,b) => {
            r/=255,g/=255,b/=255;let cmin=Math.min(r,g,b),cmax=Math.max(r,g,b),delta=cmax-cmin,h=0,s=0,l=0;(h=Math.round(60*(h=0==delta?0:cmax==r?(g-b)/delta%6:cmax==g?(b-r)/delta+2:(r-g)/delta+4)))<0&&(h+=360),l=(cmax+cmin)/2,s=+(100*(s=0==delta?0:delta/(1-Math.abs(2*l-1)))).toFixed(1),l=+(100*l).toFixed(1);
            return h + ", " + s + "%, " + l + "%";
        }
    },

    "rgba": {
        "hex": (r,g,b,a) => {
            a = Math.round(a * 255).toString(16);
            if (a.length == 1) a = "0" + a;
            if (a == 'NaN') a = '';
            return colorcoder.rgb.hex(r,g,b) + a;
        },

        "hsla": (r,g,b,a=1) => {
            return colorcoder.rgb.hsl(r,g,b) + ', ' + a;
        }
    },

    "hex": {
        "rgb": (i) => {
            i = String(i).replace('#', '');
            let r = 0, g = 0, b = 0;
            if (i.length == 3) { r = "0x" + i[0] + i[0]; g = "0x" + i[1] + i[1]; b = "0x" + i[2] + i[2];}
            else if (i.length == 4) { r = "0x" + i[1] + i[1]; g = "0x" + i[2] + i[2]; b = "0x" + i[3] + i[3];}
            else if (i.length == 6) { r = "0x" + i[0] + i[1]; g = "0x" + i[2] + i[3]; b = "0x" + i[4] + i[5];}
            return JSON.parse("["+ +r + ", " + +g + ", " + +b + "]");
        }
    },

    "hsl": {
        "rgb": (h,s,l) => {
            s=String(s).replace("%",""),l=String(l).replace("%",""),s/=100,l/=100;let c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs(h/60%2-1)),m=l-c/2,r=0,g=0,b=0;0<=h&&h<60?(r=c,g=x,b=0):60<=h&&h<120?(r=x,g=c,b=0):120<=h&&h<180?(r=0,g=c,b=x):180<=h&&h<240?(r=0,g=x,b=c):240<=h&&h<300?(r=x,g=0,b=c):300<=h&&h<360&&(r=c,g=0,b=x),r=Math.round((r+m)*255),g=Math.round((g+m)*255),b=Math.round((b+m)*255);
            return JSON.parse("["+ r + ", " + g + ", " + b + "]");
        }
    },

    "hsla": {
        "rgba": (h,s,l,a=1) => {
            return colorcoder.hsl.rgb(h,s,l) + ', ' + a;
        }
    }
}

export default colorcoder;