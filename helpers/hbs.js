const moment  = require('moment')
module.export={

    formatDate:function(date,format){
        return moment(date).format(format)

    }
}