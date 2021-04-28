import './Main.css'
import Chart from '../charts/Charts';

const Chart = () => {
    return(
        <main>
            <div className="main__container">
                <div className="main__title">
                    <div className="main__greeting">
                        <h1>Hello React JS</h1>
                        <p>Welcome to the Admin Dashboard</p>
                    </div>
                </div>

                <div className="main__cards">
                    <div className="card">
                        <i className="fa fa-user-o fa-2x text-lightblue"></i>
                        <div className="card_inner">
                            <p className="text-primary-p">Number of Patients</p>
                            <span className="font-bold text-title">300</span>
                        </div>
                    </div>

                    <div className="card">
                        <i className="fa fa-building-o fa-2x text-lightblue"></i>
                        <div className="card_inner">
                            <p className="text-primary-p">Number of Hospitals</p>
                            <span className="font-bold text-title">200</span>
                        </div>
                    </div>

                    <div className="card">
                        <i className="fa fa-file fa-2x text-lightblue"></i>
                        <div className="card_inner">
                            <p className="text-primary-p">Number of Documents</p>
                            <span className="font-bold text-title">150</span>
                        </div>
                    </div>

                    <div className="card">
                        <i className="fa fa-chart-line fa-2x text-lightblue"></i>
                        <div className="card_inner">
                            <p className="text-primary-p">Number of Submitted Cases</p>
                            <span className="font-bold text-title">300</span>
                        </div>
                    </div>
                </div>

                <div className="charts">
                    <div className="charts__left">
                        <div className="charts__left__title">
                            <div>
                                <h1>Daily Reports</h1>
                                <p>Demo Test Resports</p>
                            </div>
                            <i className="fa fa-file-alt"></i>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Chart;