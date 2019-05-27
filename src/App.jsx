//var contentNode = document.getElementById('contents');
//var component = <h1 className="hello">Hello nightRunners in k city!!!</h1>;
const contentNode = document.getElementById('contents');
// const continents = ['Africa got ','America','Asia','Australia','Europe'];
// const message = continents.map(c => <div>{`Hello ${c}!`}</div>);
// const component = <p>{message}</p>; // A simple JSX component
// ReactDOM.render(component, contentNode); 

class IssueFilter extends React.Component {
  render() {
  return (
  <div>This is a placeholder for the Issue Filter.</div>
  )
  }
  }
  class IssueTable extends React.Component {
  render() {
  return (
  <div>This is a placeholder for a table of Issues.</div>
  )
  }
  }
  class IssueAdd extends React.Component {
  render() {
  return (
  <div>This is a placeholder for an Issue Add entry form.</div>
  )
  }
  }
  class IssueList extends React.Component {
  render() {
  return (
  <div>
  <h1>Issue Tracker</h1>
  <IssueFilter />
  <hr />
  <IssueTable />
  <hr />
  <IssueAdd />
  </div>
  );
  }
  }
  

ReactDOM.render(<IssueList/>, contentNode);  