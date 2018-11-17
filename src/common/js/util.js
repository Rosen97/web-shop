export function removeSpace(value){
    return value.replace(/\s+/g,"")
}

export function formValidate(val,type){
    let phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/,
        emailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
    if(val === ''){
        return false
    }else{
        //非空验证
        if(type === 'require'){
            return !!removeSpace(val)
        }
        if(type === 'phone'){
            return phoneReg.test(val)
        }
        if(type === 'email'){
            return emailReg.test(val)
        }
    }
}

//获取url参数
export function getUrlKey (name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
}
