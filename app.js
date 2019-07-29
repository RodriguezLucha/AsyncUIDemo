// begin screener code
const returnValues = [
  'Hakuna',
  'Matata',
  'It means',
  'No worries',
  'For the rest of your days'
].sort(() => (Math.random() > 0.5 ? 1 : -1));
const createService = (retVal, index) => () =>
  new Promise(resolve =>
    setTimeout(() => {
      console.log(`${index}. ${retVal}`);
      resolve(retVal);
    }, Math.random() * 10000)
  );
const services = returnValues.map(createService);
// end screener code

document.addEventListener('DOMContentLoaded', () => {
  services.forEach((service, i) => {
    createServiceUIs(i);
    service().then(message=> resolveService(i, message));
  });
});

function createServiceUIs(i) {
  createStatus();
  createResult(i);
}

function createStatus() {
  let li = document.createElement('li');
  let content = document.createTextNode('Pending');
  li.appendChild(content);
  document.getElementById('status-list').appendChild(li);
}

function createResult(i) {
  let li = document.createElement('li');
  let content = document.createTextNode(`${i} : Pending.`);
  li.appendChild(content);
  li.setAttribute('updatedTimestamp', new Date().getTime());
  li.setAttribute('id', i);
  document.getElementById('result-list').appendChild(li);
}

function resolveService(i, message) {
  updateStatus(i);
  updateResult(i, message);
}

function updateStatus(i){
  document.getElementById('status-list').childNodes[i + 1].innerText = 'Done';
}

function updateResult(nodeId, message) {
  let list = document.getElementById('result-list');
  let nodes = Array.from(document.getElementById('result-list').children);

  nodes.forEach(e => {
    if(e.getAttribute('id') == nodeId) {
      e.setAttribute('updatedTimestamp', new Date().getTime());
      e.innerText = `${nodeId}. ${message}`;
    }
  });

  nodes.sort((a, b) => parseInt(b.getAttribute('updatedTimestamp')) - parseInt(a.getAttribute('updatedTimestamp')));
  nodes.forEach(e => list.appendChild(e));
}
