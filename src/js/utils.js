// create date array, day's distance.
function createDateRange(start, end){
    var arr = new Array(),
        dt = new Date(start);

    while (dt <= end) {
        arr.push(new Date(dt));
        dt.setDate(dt.getDate() + 1);
      }
      return arr;
};

// add option 
function createOption(ddl, text, value) {
    var opt = document.createElement('option');
    opt.value = value;
    opt.text = text;
    ddl.options.add(opt);
};

// split joint url
function createUrlPart(strWrod){
    var result =  strWrod.slice(-2,).toLowerCase() + strWrod.slice(0, 6);
    return result;
};