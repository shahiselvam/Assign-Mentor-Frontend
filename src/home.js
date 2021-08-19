import  React  from 'react';



export default function home(){


    return(
     <>


  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <div class="sidebar">
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          {/* <img src="dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image" /> */}
        </div>
        <div class="info">
          
        </div>
      </div>
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        
         
          <li class="nav-item">
            <a href="/student" class="nav-link">
             
              <i class="nav-icon fa fa-users"></i>
              <p>
                Students
                
              </p>
            </a>
          </li>
          <li class="nav-item">
            <a href="/mentor" class="nav-link">
            <i class="nav-icon fa fa-user-circle"></i>
              <p>
                Mentors
                
              </p>
            </a>
          </li>
          <li class="nav-item">
            <a href="/assignmentor" class="nav-link">
              <i class="nav-icon fas fa-th"></i>
              <p>
                Assign Mentor
                
              </p>
            </a>
          </li>
         
            </ul>
          
      </nav>
      
    </div>  
  </aside>

  
     </>

    )
}

