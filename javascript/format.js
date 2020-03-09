function format(num) {
    num = ExpantaNum(num).floor();
    return num;
  }
  
  let N = {};
  
  N.sci = function(num) {
    if (num.lt(1e3)) return num.toString();
    if (num.lt('ee6')) return OmegaNum.pow(10, num.log10().toNumber() % 1).toFixed(2).replace(/([0-9]+(.[0-9]+[1-9])?)(.?0+$)/, '$1') + 'e' + num.log10().floor().toString();
    return num.toString();
  }