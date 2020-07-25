const userList = [
  {
    name: 'CM Manik',
    email: 'mkmanik@gmail.com',
    phn: '01780849889',
  },
  {
    name: 'Tarek Masud',
    email: 'tarek@gmail.com',
    phn: '01742598745',
  },
  {
    name: 'Pori Roy',
    email: 'pori@gmail.com',
    phn: '01714785963',
  },
  {
    name: 'Joy Chowdury',
    email: 'joy99@gmail.com',
    phn: '01769874125',
  },
  {
    name: 'Dipa Roy',
    email: 'dipa98@gmail.com',
    phn: '01789574125',
  },
];

const showBtn = document.querySelector('.shwdata');
const ul = document.querySelector('.mainUl');
const editDiv = document.querySelector('.edittdiv');
const favoriteMainUl = document.getElementById('favoriteList');

class User {
  constructor(name, email, phn) {
    return {
      name,
      email,
      phn,
    };
  }
}

class UI {
  addUser(user) {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `
       <div class="row">
       <div class="col-md-8 editin">
           <h5 class="mb-1">Name : ${user.name}</h5>
           <h5 class="mb-1">Email:${user.email}</h5>
           <h5 class="mb-1">Contuct: ${user.phn}</h5>
       </div>
       <div class="col-md-4" style="text-align:end">
           <p title="Edite" class=""><i class="fa fa-pencil-square-o editbtn"></i></p>
           <p title="Add Favorite"><i class="fa fa-heart-o addFv"></i></p>
           <p title="Delete"><i class="fa fa-trash-o dlticon"></i></p>
       </div>
     </div>
       `;
    ul.insertBefore(li, ul.childNodes[0]);
  }

  deleteUser(target) {
    if (target.className == 'fa fa-trash-o dlticon') {
      target.parentElement.parentElement.parentElement.parentElement.remove();
    }
  }

  clearField() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phn').value = '';
  }

  editItem(target) {
    if (target.className == 'fa fa-pencil-square-o editbtn') {
      const fname = target.parentElement.parentElement.parentElement.childNodes[1].childNodes[1].innerText;
      const name = fname.slice(6);
      const femail = target.parentElement.parentElement.parentElement.childNodes[1].childNodes[3].textContent;
      const email = femail.slice(6);
      const fphn = target.parentElement.parentElement.parentElement.childNodes[1].childNodes[5].textContent;
      const phn = fphn.slice(8);
      const div = document.createElement('div');
      div.innerHTML = `
          <div class="modal-body">
            <div class="form-group">
              <label for="name" class="col-form-label">Name</label>
              <input type="text" class="form-control" id="namess" value ="${name}">
            </div>
            <div class="form-group">
              <label for="email" class="col-form-label">Email:</label>
              <input type="text" class="form-control" id="emailss" value ="${email}">
            </div>
            <div class="form-group">
              <label for="phn" class="col-form-label">Phone:</label>
              <input type="text" class="form-control" id="phnss" value ="${phn}">
            </div>
            <button type="subnit" class="btn btn-primary" id="update">OK</button>
        </div>
       `;
      editDiv.append(div);
      const okkbtn = document.getElementById('update');
      okkbtn.addEventListener('click', function () {
        const newName = document.getElementById('namess').value;
        const newEmail = document.getElementById('emailss').value;
        const newPhn = document.getElementById('phnss').value;
        updateData(newName, newEmail, newPhn);
        div.remove();
      });

      target.parentElement.parentElement.parentElement.parentElement.remove();
    }
  }
}

const adBtn = document.getElementById('addBtn');
adBtn.addEventListener('click', function (e) {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phn = document.getElementById('phn').value;

  const UserObj = new User(name, email, phn);
  const ui = new UI();

  if (name === '' || email === '' || phn === '') {
    alert('Please fill the all fields!');
  } else {
    userList.push(UserObj);
    ui.addUser(UserObj);
    ui.clearField();
  }
  e.preventDefault();
});

// Delete event
ul.addEventListener('click', function (e) {
  const ui = new UI();
  ui.deleteUser(e.target);
});

const userListArr = userList.map(function (user) {
  const li = document.createElement('li');
  li.className = 'list-group-item';
  li.innerHTML = `
       <div class="row mx-2 shadow pt-2">
       <div class="col-md-8 editin">
           <h5 class="mb-1">Name : ${user.name}</h5>
           <h5 class="mb-1">Email: ${user.email}</h5>
           <h5 class="mb-1">Contact: ${user.phn}</h5>
       </div>
       <div class="col-md-4" style="text-align:end">
           <p title="Edit"><i class="fa fa-pencil-square-o editbtn"></i></p>
           <p title="Add Favorite"><i class="fa fa-heart-o addFv"></i></p>
           <p title="Delete"><i class="fa fa-trash-o dlticon"></i></p>
       </div>
   </div>
   `;
  return li;
});

// Show and Add form User array data
showBtn.addEventListener('click', function () {
  userListArr.forEach(function (ee) {
    ul.append(ee);
  });
});

// Edit User event
ul.addEventListener('click', function (e) {
  const ui = new UI();
  ui.editItem(e.target);
});

function updateData(name, email, phn) {
  const UserObj = new User(name, email, phn);
  const ui = new UI();
  ui.addUser(UserObj);
}

console.log(userList.length);

// Added User favorite item
ul.addEventListener('click', function (e) {
  if (e.target.className == 'fa fa-heart-o addFv') {
    addFavorite(e.target);
  }
});

// Add data favorite item list
const favoriteListArry = [1];
function addFavorite(target) {
  const faData = target.parentElement.parentElement.parentElement.childNodes[1];
  const copyData = faData.cloneNode(true);

  // check data for already exist or not
  const dataFound = favoriteListArry.find(function (element) {
    return element === faData;
  });

  if (dataFound === undefined) {
    // let copyData = faData.cloneNode(true)
    const li = document.createElement('li');
    const allDataDiv = document.createElement('div');
    allDataDiv.className = 'row mx-2 shadow pt-2';
    li.className = 'list-group-item';
    const deleteDiv = document.createElement('div');
    deleteDiv.className = 'col-md-4';
    deleteDiv.setAttribute('style', 'text-align:end');
    deleteDiv.innerHTML = `
              <p title="Delete"><i class="fa fa-trash-o dlticon"></i></p>
          `;
    li.appendChild(allDataDiv);
    allDataDiv.appendChild(copyData);
    allDataDiv.appendChild(deleteDiv);
    favoriteMainUl.appendChild(li);
    favoriteListArry.push(faData);
  } else {
    alert('You are all Ready Add this favorite Item');
  }
}

// Remove User form Favorite list
favoriteMainUl.addEventListener('click', function (e) {
  removeFavorite(e.target);
});

function removeFavorite(target) {
  if (target.className === 'fa fa-trash-o dlticon') {
    target.parentElement.parentElement.parentElement.parentElement.remove();
  }
}
