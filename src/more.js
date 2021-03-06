import React,{Component} from 'react';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';

export default class More extends Component{
	constructor(props){
		super();	
	this.state = {
		edit:0,
	}
	this.handleShare = this.handleShare.bind(this);
	this.handleExist = this.handleExist.bind(this);
	this.handleNew = this.handleNew.bind(this);
	this.handleBack = this.handleBack.bind(this);
	}
	loading(){
	return	Swal.fire({
   		text:'loading',
   		footer:"<i class='fa fa-spinner fa-spin'></i>",	
   		showCancelButton:false,
   		allowOutsideClick:false,
   		showConfirmButton:false,
   	})
   }
	handleShare(e){
		e.preventDefault();
		//console.log("shareclicked");
		Swal.fire({
			icon:'question',
			text:'Do you want to create new budget list or share your existing budget list',
			confirmButtonText:'Create New Budget',
			cancelButtonText:'Share existing Budget',
			showCancelButton:true,
			allowOutsideClick:true,
			showCloseButton:true,
			allowEnterKey:true,
			allowEscapeKey:true,
			customClass:{
				confirmButton:'bg-warning',
			}
		})
		.then((result)=>{
			if(result.value){
				//console.log("new");
				Swal.fire({
    					icon:'question',
    					showCancelButton:true,
    					text:'Do you want other users to add or delete this budget',
			confirmButtonText:'Allow',
			cancelButtonText:'No',
			allowOutsideClick:true,
			showCloseButton:true,
			allowEnterKey:true,
			footer:'Permission to other Users',
			allowEscapeKey:true,
			customClass:{
				confirmButton:'bg-warning',
			}
    				})
    				.then((allow)=>{
    					if(allow.value){
    						this.setState({edit:1});
    					}
    					else {
    						this.setState({edit:0});
    					}

				this.handleNew();
    				})

			}
			else if(result.dismiss === Swal.DismissReason.cancel){
				//	console.log("existing");
				Swal.fire({
    					icon:'question',
    					showCancelButton:true,
    					text:'Do you want other users to add or delete this budget',
			confirmButtonText:'Allow',
			cancelButtonText:'No',
			allowOutsideClick:true,
			showCloseButton:true,

			allowEnterKey:true,
			footer:'Permission to other Users',
			allowEscapeKey:true,
			customClass:{
				confirmButton:'bg-warning',
			}
    				})
    				.then((allow)=>{
    					if(allow.value){
    						this.setState({edit:1});
    						this.handleExist();
    					}
    					else if(result.dismiss === Swal.DismissReason.cancel){
				 
    						this.setState({edit:0});
							this.handleExist();
    					}
    					else {

    					}
    				})
    			//console.log(this.state.edit);

    			
			}
			else {

			}
		})
	}

	handleNew(){
		
		var budgetname;
		Swal.fire({
			text:"Enter a name for this budget",
			confirmButtonText:"Create",
			allowEscapeKey:false,
			allowOutsideClick:true,
			showCloseButton:true,
			cancelButtonText:"Cancel",
			input:"text",
			backdrop:"#ffffff",
			background:"#ffc107",
			inputAttributes:{
				minlength:3,
				maxlength:8,
				required:true,
			},
			customClass:{
				confirmButton:'bg-warning',
				cancelButtonText:'bg-danger'
			},
			footer:'A name can be a theme or purpose of this budget',
		})
		.then((budgetname)=>{
			if(budgetname.value){
				budgetname =budgetname.value;
		const user =JSON.parse(atob(localStorage.budgetuser));
			var {username,email} = user;
			 username = atob(username);
			 email = atob(email);
			 var jwt = localStorage.jwt;
			 const req = email+"&^%"+jwt+"&^%"+this.state.edit+"&^%"+budgetname;
			 this.loading();
			fetch("https://novling.000webhostapp.com/budgetapp/sharenew.php",{
				method:"POST",
				body:req,
			})
			.then(response=>response.json())
			.then((data)=>{
				console.log(data);
				if(data.code==200){
					Swal.fire({
						icon:'success',
						html:"Your Budget sharing code is <br/><u>"+data.token+"</u> and the sharing link is <a target='_blank' href='shared/"+data.token+"' class='text-yellow'>Budget Link</a> ",
						footer:'Budget Code:'+data.token,
						confirmButtonText:'Open Budget',
						showCancelButton:true,
						cancelButtonText:'Close',
						invertButtons:true,
						allowEscapeKey:true,
						allowOutsideClick:false,
						showCloseButton:true,
						customClass:{
							confirmButton:'bg-warning',

						}
					})
					.then((result)=>{
						if(result.value){
						const link = "shared/"+data.token;
						this.props.history.push(link);
					}
				})
			}
				else {
					throw data.token;
				}
		})
			.catch((err)=>{
				Swal.fire({
				icon:'error',
				showConfirmButton:false,
				text:err,
				timer:2000,
			})
			.then((mov)=>{
				console.log(err);
				this.props.history.push("/app");
			})
			})
	

			}
			else {
				this.handleNew();
			}
		})
	}
//https://novling.000webhostapp.com/budgetapp/
	handleExist(){
		
		var budgetname;
		Swal.fire({
			text:"Enter a name for this budget",
			confirmButtonText:"Create",
			allowEscapeKey:false,
			allowOutsideClick:true,
			showCloseButton:true,
			cancelButtonText:"Cancel",
			input:"text",
			backdrop:"#ffffff",
			background:"#ffc107",
			inputAttributes:{
				minlength:3,
				maxlength:8,
				required:true,
			},
			customClass:{
				confirmButton:'bg-warning',
				cancelButtonText:'bg-danger'
			},
			footer:'A name can be a theme or purpose of this budget',
		})
		.then((budgetname)=>{
			if(budgetname.value){
				budgetname =budgetname.value;
		const user =JSON.parse(atob(localStorage.budgetuser));
			var {username,email} = user;
			 username = atob(username);
			 email = atob(email);
			 var jwt = localStorage.jwt;
			 this.loading();
			 const req = email+"&^%"+jwt+"&^%"+this.state.edit+"&^%"+budgetname;
			fetch("https://novling.000webhostapp.com/budgetapp/sharexist.php",{
				method:"POST",
				body:req,
			})
			.then(response=>response.json())
			.then((data)=>{
				console.log(data);
				if(data.code==200){
					Swal.fire({
						icon:'success',
						html:"Your Budget sharing code is <br/><u>"+data.token+"</u> and the sharing link is <a target='_blank' href='shared/"+data.token+"' class='text-yellow'>Budget Link</a> ",
						footer:'Budget Code:'+data.token,
						confirmButtonText:'Share <i class="fa fa-share"></i>',
						showCancelButton:true,
						cancelButtonText:'Close',
						invertButtons:true,
						allowEscapeKey:true,
						allowOutsideClick:false,
						showCloseButton:true,
						customClass:{
							confirmButton:'bg-warning',

						}
					})
					.then((result)=>{
						if(result.value){
							
							if(navigator.share){
						   navigator.share({
						      title: username+' shared a budget with you on BudgetApp. Budget Code is'+data.token,
						      url: "https://budgetty.now.sh/#/shared/"+data.token,
						    }).then(() => {
						      throw 'Thanks for sharing!';
						    })
						    .catch((err)=>{
						    	
						    });
							
							}
							}
					})
				}
				else {
					throw data.token;
				}
		})
			.catch((err)=>{
				Swal.fire({
				icon:'error',
				showConfirmButton:false,
				text:err,
				timer:2000,
			})
			.then((mov)=>{
				console.log(err);
				this.props.history.push("/app");
			})
			})
			}
			else {
				this.handleExist();
			}
		})
	}
	componentDidMount(){
	if(localStorage.budgetuserset=="true"&&localStorage.jwt!=undefined&&localStorage.budgetuser!=undefined&&localStorage.budgetuser!=''&&localStorage.jwt!=''){
				document.getElementById("more").style.display="block";
				document.getElementById("bell").style.display="block";
			}
			else {
				this.props.history.push("/app");
			}
	}
	handleBack(){
		console.log(this.props.history);
		this.props.history.goBack();
		
	}
	render(){
			return (
				<main className="moremain">
				<div className="backbtn">
					<i className="fa fa-arrow-left" onClick={this.handleBack}></i>
					<span>Back</span>
				</div>
				<div className="allbudgets">
						<div className="budget" style={{"textAlign":"center"}}>
				<Link to="/shared">
							<i className="fa fa-share"></i>
							<span className="itemname"> Shared Budgets</span>
							<label>Budgets you've shared with people</label>
					</Link>
						</div>
					
						<div className="budget" style={{"textAlign":"center"}}>
				<a onClick={this.handleShare}>
							<i className="fa fa-user"></i>
							<span className="itemname"> Share your budget</span>
							<label>Share the budget with people</label>
				</a>
						</div>
					
						<div className="budget" style={{"textAlign":"center"}}>
					<Link to="/logout">
							<i className="fa fa-power-off"></i>
							<span className="itemname"> Log Out</span>
							<label>Log Out of this account permanently</label>
					</Link>
						</div>
					
						<div className="budget" style={{"textAlign":"center"}}>
						<i className="fa fa-copyright"></i>
							<span className="itemname"><a href="https://twitter.com/swipeinc"> Swipe </a></span>
						</div>
					
					
				</div>
				</main>
				)
	}
}