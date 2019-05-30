//var contentNode = document.getElementById('contents');
//var component = <h1 className="hello">Hello nightRunners in k city!!!</h1>;
const contentNode = document.getElementById('contents');
// const continents = ['Africa got ','America','Asia','Australia','Europe'];
// const message = continents.map(c => <div>{`Hello ${c}!`}</div>);
// const component = <p>{message}</p>; // A simple JSX component
// ReactDOM.render(component, contentNode); 

const IssueRow=(props)=>{
    const issue = props.issue;
    return (
      <tr>
        <td>{issue.id}</td>
        <td>{issue.status}</td>
        <td>{issue.owner}</td>
        <td>{issue.created.toDateString()}</td>
        <td>{issue.effort}</td>
        <td>{issue.completionDate ?
          issue.completionDate.toDateString() : ''}</td>
        <td>{issue.title}</td>
      </tr>
    )
  }


    function IssueTable(props) {
      
        //const borderedStyle = { border: "1px solid silver", padding: 7, color: "blue" };
        const issueRows = props.issues.map( issue => 
        <IssueRow key={issue.id} issue={issue} /> )
    return (
      <table className="bordered-table">
        <thead style={{color:"brxown"}}>
          <tr>
            <th>Id</th>
            <th>Status</th>
            <th>Owner</th>
            <th>Created</th>
            <th>Effort</th>
            <th>Completion Date</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>{issueRows}</tbody>
      </table>
    )
  }


class IssueAdd extends React.Component{
  constructor(){
    super();
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  handleSubmit(e){
    e.preventDefault();
    var form=document.forms.issueAdd;
    this.props.createIssue(
      {
        owner:form.owner.value,
        title:form.title.value,
        status:'new',
        created:new Date(),
      }
    )
    //clear the form in readiness for the next input
    form.owner.value='';
    form.title.value='';
  }
  render(){
    return(
      <div>
        <form name="issueAdd" onSubmit={this.handleSubmit}x >
          <input type="text" name="owner" placeholder="Owner"></input>
          <input type="text" placeholder="Title" name="title"></input>
          <button>Add</button>
        </form>
      </div>
    )
  }
}

class IssueList extends React.Component {
  constructor(){
    super();
    this.state={issues: []};

    this.createIssue = this.createIssue.bind(this);
    
  }
  componentDidMount(){
    this.loadData();
  }
  loadData(){
    setTimeout(()=>{
      this.setState({issues:issues})
    },2000)
  }
  createIssue(newIssue){
    const newIssues=this.state.issues.slice();
    newIssue.id=this.state.issues.length+1;
    newIssues.push(newIssue);
    this.setState({issues:newIssues});
  }
  render() {
    return (
      <div>
        <h1>Issue Tracker</h1><hr />
        <IssueTable issues={this.state.issues} />
        <hr/>
        <IssueAdd createIssue={this.createIssue}/>
      </div>
    );
  }
}

const issues = [
  {
    id: 1, status: 'Open', owner: 'Ravan',
    created: new Date('2016-08-15'), effort: 5, completionDate: undefined,
    title: 'Error in console when clicking Add',
  },
  {
    id: 2, status: 'Assigned', owner: 'Eddie',
    created: new Date('2016-08-16'), effort: 14,
    completionDate: new Date('2016-08-30'),
    title: 'Missing bottom border on panel',
  },
];



ReactDOM.render(<IssueList />, contentNode);  