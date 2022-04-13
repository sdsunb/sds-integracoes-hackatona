import { BrowserRouter, Route } from 'react-router-dom';
import { Help } from './pages/Help';
import { Login } from './pages/Login';
import { Result } from './pages/Result';
import { StepOne } from './pages/StepOne';
import { StepTwo } from './pages/StepTwo';

function App() {
    return(
        <BrowserRouter>
            <Route path="/" exact component={Login} />
            <Route path="/help" component={Help} />
            <Route path="/stepOne" component={StepOne} />
            <Route path="/stepTwo" component={StepTwo} />
            <Route path="/result" component={Result} />
        </BrowserRouter>
    );
}

export default App;
