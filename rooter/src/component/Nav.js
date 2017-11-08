import {Link} from 'react-router-dom';
export default class extends Component{
	// constructor(props){
	// 	super(props);
	// 	this.state = {

	// 	}
    // }
    
	render(){
        // let {changeView} = this.props;
        let {history} = this.props;
        console.log('====================================');
        console.log(history);
        console.log('====================================');
		return(
			// <ul>
            //     <li><a href="#"
            //         onClick={()=>changeView('Home')}
            //     >首页</a></li>
            //     <li><a href="#"
            //         onClick={()=>changeView('Teleplay')}
            //     >剧集</a></li>
            //     <li><a href="#"
            //         onClick={()=>changeView('Movie')}
            //     >视频</a></li>
            // </ul>
            <ul>
                <li><span onClick={()=>{
                    history.push('/')}}>首页</span></li>
                <li><Link to='/teleplay'>剧集</Link></li>
                <li><Link to='/movie'>剧集</Link></li>
            </ul>
		)
	}
}