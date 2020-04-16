import React, { Component } from 'react'
import AppBar from '../../../components/AppBar/AppBar'
import { Badge, Jumbotron, Container, Row, Col, InputGroup, InputGroupAddon, Form, InputGroupText, Input, Button, Label, FormGroup } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faWallet, faDollarSign, faList, faCalendar, faBox, faClock } from '@fortawesome/free-solid-svg-icons'
import ResultCard from "../../../components/UI/ResultCard"
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Footer from '../../../components/Footer/Footer';


import './CalculationPage.css';

class CalculationPage extends Component {

    state = {
        packs: [],
        periods: [],
        durations: [],
        pageFirst:1,
        pageSecond:2,
        pageLast:3,
        name: null,
        result: [],
        page: 1,
        newPeriods:[],
        pack: null,
        duration: null,
        period: null,
        packageAmount: null,
        resultHead: '',
        simulation: '',
        points:0,
        selectedDuration:'none',
        selectedPeriod:'none',
        selectedReinvestment:'',
        selectedPack:'none'
    }

    componentDidMount() {
       
            console.log("component did mount")
             this.props.getCalculate();
       
       
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.simulation) {
            const { simulation } = nextProps;


            let result = [];
            let resultHead = "";
            let content = "";

            const { leftPacksPerWeek, plan, pack, duration, period, points } = simulation;
            const reinvestType = period == 1 ? "Weekly" : period == 2 ? "Every 2 Weeks" : period == 4 ? "Monthly" : period == 13 ? "Quarterly" : period == 26 ? "Semi-annually" : "Annually";

            console.log({ leftPacksPerWeek })
            let rem = 0
            leftPacksPerWeek.forEach(({ week, packs, balance, payouts, invest }, index) => {
                console.log({ result })
                rem = (balance).toFixed(2);
                const payout = payouts.map((item) => '$' + item.toFixed(2));
                const balPrevW = (index == 0) ? 0 : leftPacksPerWeek[index - 1].balance;
                const totPayout = payouts.reduce((acc, val) => Number(acc) + Number(val)).toFixed(2);

                result.push(<ResultCard key={week} week={week} payout={payout} balw={balance} balPrevW={balPrevW} totBal={balance + invest} totPayout={totPayout} invest={invest} rem={rem} bg="#73EC2" activePacks={packs} />);


            });
            //result.unshift 
            resultHead = ('')
            return { ...prevState, result, resultHead };
        }

        if (nextProps.data.plan) {
            console.log("get derived")
            const { plan: { packs, periods, durations, name,points } } = nextProps.data;
            return { ...prevState, packs, periods, durations, name,points };
        }
        return prevState;
    }

    inputChangeHandler = (e, name) => {
        
         //this.setState({ [name]: e.target.value });
        if(name=="pack" && e.target.value == 1){
            let periods = this.state.periods.filter(item=>item.id === 6);
            let selectedPack = "$"+this.state.packs[e.target.value-1].name;

            this.setState({newPeriods:periods})
            this.setState({selectedPack})

        }
        if(name=="pack" && e.target.value == 2){
             let periods = this.state.periods.filter(item=>item.id >= 5);
             let selectedPack = "$"+this.state.packs[e.target.value-1].name;

             this.setState({newPeriods:periods})
             this.setState({selectedPack})
         }
         if(name=="pack" && e.target.value == 3){
             let periods = this.state.periods.filter(item=>item.id >= 4);
             let selectedPack = "$"+this.state.packs[e.target.value-1].name;

             this.setState({newPeriods:periods})
             this.setState({selectedPack})
         }
         if(name=="pack" && e.target.value == 4){
             let periods = this.state.periods.filter(item=>item.id >= 3);
             let selectedPack = "$"+this.state.packs[e.target.value-1].name;

             this.setState({newPeriods:periods})
             this.setState({selectedPack})
         }
         if(name=="pack" && e.target.value == 5){
             let periods = this.state.periods.filter(item=>item.id >= 2);
             let selectedPack = "$"+this.state.packs[e.target.value-1].name;

             this.setState({newPeriods:periods})
             this.setState({selectedPack})
         }
         if(name=="pack" && e.target.value >= 6){
             let periods = this.state.periods.filter(item=>item.id >= 1);
             let selectedPack = "$"+this.state.packs[e.target.value-1].name;

             this.setState({newPeriods:periods})
             this.setState({selectedPack})
         }
         if(name=="duration"){
             let selectedDuration = this.state.durations[e.target.value-1].name
             this.setState({selectedDuration})
         }
         if(name=="period"){

            let selectedPeriod = this.state.periods[e.target.value-1].name;
            console.log(e.target.value-6+1)
            this.setState({selectedPeriod})
        }





    }

    clickHandler = e => {
        e.preventDefault();
        this.props.makeCalculation(e.target)
    }

    previousPageHandler = () => {
        const { page } = this.state;
        if (page <= 1) return;
        this.setState({ page: this.state.page - 1 });
        let pageFirst=this.state.pageFirst+1,
        pageSecond=this.state.pageSecond-1,
        pageLast=this.state.pageLast-1;
    this.setState({pageFirst,pageSecond,pageLast});
    }

    nextPageHandler = () => {
        const { page, result } = this.state;
        if (page >= result.length / 8) return;
        this.setState({ page: this.state.page + 1 });
        let pageFirst=this.state.pageFirst+1,
        pageSecond=this.state.pageSecond+1,
        pageLast=this.state.pageLast+1;
    this.setState({pageFirst,pageSecond,pageLast});
    }

    firstPageHandler = () => {
        const { page } = this.state;
        if (page <= 1) return;
        this.setState({ page: 1 });
        let pageFirst=1,pageSecond=2,pageLast=3
        this.setState({pageFirst,pageSecond,pageLast});
    }

    lastPageHandler = () => {
        const { page, result } = this.state;
        if (page >= result.length / 8) return;
        this.setState({ page: Math.ceil(result.length / 8) });
        let pageFirst=(result.length/8)-2,pageSecond=(result.length/8)-1,pageLast=(result.length/8)
        this.setState({pageFirst,pageSecond,pageLast});
    }

    pageChangeHandler = page => {
        this.setState({ page });
       
    }

    render() {
       console.log("Render "+this.state.periods)
        //console.log(result.length)
        let { page, packs, newPeriods, durations,points,name } = this.state;
        let result = [];
        // if( this.props.simulation.leftPacksPerWeek){
        //             let WeeksArray = this.props.simulation.leftPacksPerWeek;
        // let lastWeekIndex = WeeksArray.length-1;
        // }

        let resultHead = []
        if (this.state.result.length > 0) result = this.state.result.filter((r, i) => (i >= (page - 1) * 8) && (i < page * 8));
        packs = packs.map(({ id, name }) => <option key={id} value={id}>{name}</option>);
        newPeriods = newPeriods.map(({ id, name }) => <option key={id} value={id}>{name}</option>);
        durations = durations.map(({ id, name }) => <option key={id} value={id}>{name}</option>);

        return (
            <div className="h-100">
                <Row className="p-5 align-items-center h-100">
                    <Col className="home-page mb-5" xs={3}>
                        <h4 className="text-left text-light w-100">Please fill the form below to get started to proceed</h4>
                        <div className="inderline w-100">
                            <hr className="bg-secondary" />
                            <div className="dot-warning bg-warning rounded-circle position-relative"></div>
                        </div>
                        <p className="text-light">You have <span className="text-warning">3</span> Calculations remaining</p>
                        <div>
                            <Form onSubmit={this.clickHandler}>
                                <Row>
                                    <Col xs={{ size: 11 }} className="align-self-start w-50">
                                        <InputGroup size='sm outline-0'>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText style={{ border: '0' }} className="user-input bg-dark" >
                                                    <FontAwesomeIcon color="#F5A10E" icon={faWallet} /><strong style={{ marginLeft: '10px', fontSize: '30px' }}>|</strong> </InputGroupText>
                                            </InputGroupAddon>
                                            <Input onChange={(e) => this.inputChangeHandler(e, "pack")} name="pack" type="select" required style={{ height: '65px' }} className="text-light bg-dark border-0 ">
                                                <option value={null}>Select a package</option>
                                                {packs}
                                            </Input>
                                        </InputGroup>
                                    </Col>
                                    <Col className="mt-4" xs={{ size: 11 }}>
                                        <InputGroup size='sm outline-0'>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText style={{ border: '0' }} className="user-input bg-dark" >
                                                    <FontAwesomeIcon color="#F5A10E" icon={faCalendar} /><strong style={{ marginLeft: '10px', fontSize: '30px' }}>|</strong> </InputGroupText>
                                            </InputGroupAddon>
                                            <Input name="period" onChange={(e) => this.inputChangeHandler(e, "period")} type="select" required style={{ height: '65px' }} className="text-light bg-dark border-0 ">
                                                <option value={null}>Select Reinvestment type</option>
                                                {newPeriods}
                                            </Input>
                                        </InputGroup>
                                    </Col>
                                    <Col className="mt-4" xs={{ size: 11 }}>
                                        <InputGroup size='sm outline-0'>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText style={{ border: '0' }} className="user-input bg-dark" >
                                                    <FontAwesomeIcon color="#F5A10E" icon={faCalendar} /><strong style={{ marginLeft: '10px', fontSize: '30px' }}>|</strong> </InputGroupText>
                                            </InputGroupAddon>
                                            <Input onChange={(e) => this.inputChangeHandler(e, "duration")} name="duration" type="select" required style={{ height: '65px' }} className="text-light bg-dark border-0 ">
                                                <option value={null}>Select a duration</option>
                                                {durations}
                                            </Input>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <br />
                                <Button style={{ backgroundColor: "#F5A10E" }} className="float-left h-75" size=" w-75 ">
                                    <h3 >Continue <FontAwesomeIcon icon={faChevronRight} /><FontAwesomeIcon icon={faChevronRight} /></h3>
                                </Button>
                            </Form>
                        </div>
                    </Col>
                    <Col xs={1}><div className="ml-4  paye-v-line float-left"></div></Col>
                    <Col xs={8} className="h-100">

                       
                            <div className="h-100 d-flex flex-column overflow-hidden">
                                <div style={{ fontFamily: 'Bahnschrift' }} className="bg-white rounded-lg  pt-4 pb-3 mb-3">
                                <Row className="justify-content-between text-left">
                <Col xs={3} className="ml-4 ">
                    <h4>{name} 🥇 </h4>
                    <h6>Code: CERT8085E</h6>
                </Col>
                <Col xs={4}>
                    <Row>
                        <Col className="mb-1" xs={12}>
                            <FontAwesomeIcon color="#F5A10E" icon={faBox} /> Your selected package: {this.state.selectedPack}
                        </Col>
                        <Col xs={12}>
                            <FontAwesomeIcon color="#F5A10E" icon={faCalendar} /> Duration Selected : {this.state.selectedDuration} 
                        </Col>
                    </Row>
                </Col>
                <Col className="mb-3" xs={{ size: 4 }} >
                    <div>
                        <FontAwesomeIcon icon={faList} color="#F5A10E" /> Reinvestment Type : {this.state.selectedPeriod}
                    </div>

                    <div>
                        <FontAwesomeIcon icon={faClock} color="#F5A10E" /> Calculation Left : <span className="text-danger">{points}</span>
                    </div>
                </Col>
            </Row>
                                </div>
                                {result.length > 0 ? <div className="flex-fill bg-white overflow-hidden d-flex flex-column rounded-lg px-5 pt-3">
                                    <div className="flex-fill" style={{ overflowY: 'auto' }}>
                                        <Row style={{ transform: 'scale(.8)', transformOrigin: 'center', margin: '-5% -10% -5% -10%' }}>
                                            {result}
                                        </Row>
                                    </div>
                                    <Row>
                                        <Col className="text-left mt-4" xs={10}>
                                            <h5 className=" float-left">Balance after {this.props.simulation.leftPacksPerWeek.length < (8 * this.state.page) ? this.props.simulation.leftPacksPerWeek[this.props.simulation.leftPacksPerWeek.length - 1].week : this.props.simulation.leftPacksPerWeek[8 * this.state.page - 1].week} weeks of continuous investment : <span className=" text-success" >${this.props.simulation.leftPacksPerWeek.length < (8 * this.state.page) ? this.props.simulation.leftPacksPerWeek[this.props.simulation.leftPacksPerWeek.length - 1].balance.toFixed(2) : this.props.simulation.leftPacksPerWeek[8 * this.state.page - 1].balance.toFixed(2)}</span></h5>
                                        </Col>
                                        <Col xs={{ size: 3, offset: 6 }}>
                                            <nav className="float-end" aria-label="Page navigation example">
                                                <ul className="pagination">
                                                    <li className="page-item" onClick={this.firstPageHandler}><a className="bg-warning text-light page-link d-inline-flex align-items-end"><FontAwesomeIcon icon={faChevronLeft} /><FontAwesomeIcon icon={faChevronLeft} /><span className="ml-2">First</span></a></li>
        <li className="page-item" onClick={this.previousPageHandler}><a className="bg-warning text-light page-link d-inline-flex align-items-end"><span className="ml-2">|</span><FontAwesomeIcon icon={faChevronLeft} /><FontAwesomeIcon icon={faChevronLeft} /></a></li>
                                                    <li className="page-item "><a style={{ backgroundColor: '#e9ecef', color: 'black' }} className=" page-link">{this.state.pageFirst}</a></li>
                                                    <li className="page-item"><a style={{ backgroundColor: '#e9ecef' }} className="text-secondary page-link">{this.state.pageSecond}</a></li>
                                                    <li className="page-item"><a style={{ backgroundColor: '#e9ecef' }} className="text-secondary page-link">{this.state.pageLast}</a></li>
                                                    <li className=" page-item h-100" onClick={this.nextPageHandler}><a className="bg-primary text-light page-link d-inline-flex align-items-end"><FontAwesomeIcon icon={faChevronRight} /><FontAwesomeIcon icon={faChevronRight} /><span className="">|</span></a></li>
                                                    <li className="page-item" onClick={this.lastPageHandler}><a className="bg-primary text-light page-link d-inline-flex align-items-end"><span className="mr-2">Last</span><FontAwesomeIcon icon={faChevronRight} /></a></li>
                                                </ul>
                                            </nav>
                                        </Col>
                                    </Row>
                                </div>: <h3 style={{ fontFamily: 'Bahnschrift' }} className="text-light mt-5 ">Your result will show in this area !</h3> }
                            </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => ({ ...state.calculation });

const mapDispatchToProps = dispatch => {
    return {
        getCalculate: () => dispatch(actions.getCalculate()),
        makeCalculation: (data) => dispatch(actions.makeCalculation(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalculationPage);