//var contentNode = document.getElementById('contents');
//var component = <h1 className="hello">Hello nightRunners in k city!!!</h1>;
const contentNode = document.getElementById('contents');
// const continents = ['Africa got ','America','Asia','Australia','Europe'];
// const message = continents.map(c => <div>{`Hello ${c}!`}</div>);
// const component = <p>{message}</p>; // A simple JSX component
// ReactDOM.render(component, contentNode); 

class IssueRow extends React.Component {
  render() {
    const issue = this.props.issue;
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
}

    class IssueTable extends React.Component {
      render() {
        //const borderedStyle = { border: "1px solid silver", padding: 7, color: "blue" };
        const issueRows = this.props.issues.map( issue => 
        <IssueRow key={issue.id} issue={issue} /> )
    return (
      <table className="bordered-table">
        <thead style={{color:"green"}}>
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
}


class IssueList extends React.Component {
  render() {
    return (
      <div>
        <h1>Issue Tracker</h1><hr />
        <IssueTable issues={issues} />
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