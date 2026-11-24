import "./footer.css";
import {IoHome} from "react-icons/io5"
import {AiFillOpenAI} from "react-icons/ai"
import {MdExplore,MdDataSaverOn} from "react-icons/md"
import {SiGoogleanalytics} from "react-icons/si"
import { Link } from "react-router-dom";


function Footer({name}) {
    let navigations=[
        {
            name:"HOME",
            logo:<IoHome/>,
            clsatt:name=== "Home",
            path:"/"
        },
        {
            name:"GENERATE",
            logo:<AiFillOpenAI/>,
            clsatt:name=== "Generate",
            path:"/generate"
        },
        {
            name:"EXPLORE",
            logo:<MdExplore/>,
            clsatt:name=== "Explore",
            path:"/explore",
        },
        {
            name:"SAVED",
            logo:<MdDataSaverOn/>,
            clsatt:name=== "Saved",
            path:"/saved",
        },
        {
            name:"TRACKER",
            logo:<SiGoogleanalytics/>,
            clsatt:name=== "Tracker",
            path:"/tracker",
        },
    ]
  return (
    <div className="footer-main">
        {navigations.map((navigation,i)=>{
            return(
                <Link key={i} to={navigation.path}>
                <div  className= {navigation.clsatt? "Footer-cont active": "Footer-cont"} >
                    <div className="footer-logo">{navigation.logo}</div>
                    <div className="footer-name">{navigation.name}</div>
                </div>
                </Link>
            );
        })}
    </div>
  )
}

export default Footer;