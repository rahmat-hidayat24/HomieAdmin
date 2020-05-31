// import Intl from 'intl'
// import 'intl/locale-data/jsonp/id-ID'
// import Moment from 'moment-timezone'

exports.GetBackEndserver = ()=> {
    const backEndLocalAddress = 'http://192.168.100.20:8000';
    const backEndServerAddress = 'http://192.168.43.219:8000';
    const backEndAddress = 'http://192.168.21.91:8000';
    const backEndInUse = 'http://192.168.100.20:8000';
    if(backEndInUse === 'http://192.168.100.20:8000') {return backEndLocalAddress;}
    else {return backEndServerAddress;}
  }

  
  exports.FormatCurrency = (value) =>{
    var formattedNumber = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0, minimumFractionDigits:0 }).format(value)
    return formattedNumber;
  }

  exports.FormatTZTime = (time) =>{
    var timeZone = Moment.tz.guess()
    var timeZoneOffset = time.getTimezoneOffset()
    var TZtext = Moment.tz.zone(timeZone).abbr(timeZoneOffset)
    return TZtext; 
    // WIB, WIT or WITA ( Local Time )
  }
    


