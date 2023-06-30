import SettingModel from "../../../Models/Setting.js";



enum Styles{STYLE_1=1,STYLE_2, STYLE_3};

const settings = {
    "companyDetails": {
      "siteName": "PayBuddie",
      "zip": "540212",
      "city": "Enugu",
      "state": "Enugu",
      "country": "Nigeria",
      "description": "Some brief description here about the company would do!",
      "email": [
        "paybuddie@support.com"
      ],
      "contact": [
        "08155393750"
      ],
      "address": "14 Etta Agbor Road Calabar, CRS",
      "activeHours": "Mon - Fri: 7:00am - 6:00pm  Saturday: 9:00am - 5:00pm  Sunday: Closed",
      "socialMedia":{
      "facebookHandle": "https://www.facebook.com/paybuddie",
      "twitterHandle": "https://www.twitter.com/paybuddie",
      "instagram": "https://www.instagram.com/paybuddie",
      "whatsapp": "https://www.whatsapp.com/paybuddie",
      }
    },
    "siteImages":{
      "favicon": "",
      "logo": "1",
      "logoDark": ""
    },
    "dashboardConfig": {
      "layoutOptions": {
        "typography": "poppins",
        "version": "light",
        "layout": "vertical",
        "primary": "color_10",
        "headerBg": "color_1",
        "navheaderBg": "color_4",
        "sidebarBg": "color_4",
        "sidebarStyle": "full",
        "sidebarPosition": "fixed",
        "headerPosition": "fixed",
        "containerLayout": "full",
        "direction": "ltr"
      }
    },
    "landingPageConfig": {
      "navStyle": 3,
      "sliderStyle": 2,
      "aboutStyle": 2,
      "testimonialStyle": 2,
      "ourBenefitStyle": 3,
      "whatWeOfferStyle": 3,
      "showAffiliate": true,
      "showBlog": true,
      "showTestimonial": true
    },
    "pages": {
      "aboutUs": "<p>about us</p>",
      "privacyPolicy": "<p>ycilop ycavirp</p>",
      "termsCondition": "<p>snoitidnoc&nbsp; dna smret</p>"
    }
  }
const settingsSeed = async()=>{
      var update ={expire:new Date()},
      options ={upsert:true,new:true,setDefaultOnInsert:true};

              const createSettings = await SettingModel.findOneAndUpdate({
        ...settings
    },update,options)

    
}

export default settingsSeed;