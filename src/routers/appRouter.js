import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddFxAction from "../components/Forms/Actions/AddFxAction";
import AddPredAction from "../components/Forms/Actions/AddPredAction";
import NewAction from "../components/Forms/Actions/NewAction";
import AddFxParams from "../components/Forms/Functions/AddParamsFx";
import NewFunction from "../components/Forms/Functions/NewFunction";
import AddPredParams from "../components/Forms/Predicates/AddParamsPred";
import NewPredicate from "../components/Forms/Predicates/NewPredicate";
import NewProblem from "../components/Forms/Problems/NewProblem";
import AddFxState from "../components/Forms/States/AddFxState";
import AddPredState from "../components/Forms/States/AddPredState";
import NewState from "../components/Forms/States/NewState";
import NewType from "../components/Forms/Types/NewType";
import Dashboard from "../components/Layout/Dashboard/Dashboard";
import SignIn from "../components/Layout/LoginScreen/loginScreen";
import NotFound from "../components/Layout/notFound";
import LoadProjects from "../components/Layout/Projects/LoadProjects";
import { NewProject } from "../components/Layout/Projects/NewProject";
import Projects from "../components/Layout/Projects/Projects";
import ProblemSetup from "../components/Forms/Problems/ProblemSetup";
import NewProblemSetup from "../components/Forms/Problems/ProblemSetup2";
import NewProblemObject from "../components/Forms/Problems/NewObject";
import AddPredProblem from "../components/Forms/Problems/ProblemPredicate";


export default function AppRouter(){

    return(
        <BrowserRouter>
            <Routes>
                <Route  path="/" element={<SignIn />}/>
                <Route  path="/dashboard" element={<Dashboard />}/>
                <Route  path="/newtype" element={<NewType />}/>
                <Route  path="/newpredicate" element={<NewPredicate />}/>
                <Route  path="/newaction" element={<NewAction />}/>
                <Route  path="/newstate" element={<NewState />}/>
                <Route  path="/newproblem" element={<NewProblem />}/>
                <Route  path="/newfunction" element={<NewFunction />}/>
                <Route  path="/projects" element={<Projects />}/>
                <Route  path="/newproject" element={<NewProject />}/>
                <Route  path="/loadproject" element={<LoadProjects />}/>
                <Route  path="/addpredparams" element={<AddPredParams />}/>
                <Route  path="/addfunctionparams" element={<AddFxParams />}/>
                <Route  path="/addstateparams" element={<AddPredState />}/>
                <Route  path="/addactionparams" element={<AddPredAction />}/>
                <Route  path="/addactionfunction" element={<AddFxAction />}/>
                <Route  path="/addstatefunction" element={<AddFxState />}/>
                <Route  path="/problemsetup" element={<ProblemSetup />}/>
                <Route  path="/newproblemsetup" element={<NewProblemSetup />}/>
                <Route  path="/newproblemobject" element={<NewProblemObject />}/>
                <Route  path="/newproblempredicate" element={<AddPredProblem />}/>
                <Route  path="/newproblemfunction" element={<NewProblemSetup />}/>
                <Route  path="/newproblemgoal" element={<NewProblemSetup />}/>
                <Route  path="*" element={<NotFound />}/>
            </Routes>
        </BrowserRouter>
    );


}