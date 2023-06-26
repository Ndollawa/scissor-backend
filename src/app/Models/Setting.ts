import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;

const SettingSchema =  new Schema({
    landingPageConfig:{
        showBlog:{type:Boolean,default:true},
        showAffiliate:{type:Boolean,default:true},
        showTestimonial:{type:Boolean,default:true},
        navStyle:{
            type:Number,
            enum: {values: [1,2,3],message: '{VALUE} is not supported',default:1},},
        sliderStyle:{
            type:Number,
            enum: {values: [1,2,3],message: '{VALUE} is not supported',default:1},}
        ,
        aboutStyle:{
            type:Number,
            enum: {values: [1,2,3],message: '{VALUE} is not supported',default:1},},
        testimonialStyle:{
            type:Number,
            enum: {values: [1,2,3],message: '{VALUE} is not supported', default:1},},
        ourBenefitStyle:{
            type:Number,
            enum: {values: [1,2,3],message: '{VALUE} is not supported'},},
        whatWeOfferStyle:{
            type:Number,
            enum: {values: [1,2,3],message: '{VALUE} is not supported'},}
        
    },
   
    dashboardConfig:{
        layoutOptions: {
            typography:{type:String,default:"poppins" },
            version:{type:String,default:"light"},
            layout: {type:String,default:"vertical"},
            headerBg:{type:String,default:"color_4"},
            primary: {type:String,default:"color_4"},
            navheaderBg: {type:String,default:"color_4"},
            sidebarBg: {type:String,default:"color_4"},
            sidebarStyle: {type:String,default:"full"},
            sidebarPosition: {type:String,default:"fixed"},
            headerPosition: {type:String,default:"fixed"},
            containerLayout: {type:String,default:"full"},
            direction: {type:String,default:"ltr"}

            }
    },
    companyDetails:{
        siteName:{type:String},
        description:{type:String},
        email:{type:[String]},
        contact:{type:[String]},
        address:{type:String},
        zip:{type:String},
        city:{type:String},
        state:{type:String},
        country:{type:String},
        activeHours:{type:String},
        socialMedia:{
        facebookHandle:{type:String},
        twitterHandle:{type:String},
        instagram:{type:String},
        whatsapp:{type:String }
        }

    },
    siteImages:{
        logo:{type:String},
        logoIcon:{type:String},
        logoDark:{type:String},
        favicon:{type:String},
        backgroundImage:{type:String},
        aboutUsBg:{type:String},
        pagesBg:{type:String},
    },
    pages:{
        aboutUs:{type:String},
        privacyPolicy:{type:String},
        termsCondition:{type:String}
    }
},
{timestamps:true});
SettingSchema.plugin(mongoosePaginate);
export default mongoose.model('Setting',SettingSchema);