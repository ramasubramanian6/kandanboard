<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rama's kandon board</title>
    <link rel="stylesheet" href="kandon_board.css">
    <script src="https://kit.fontawesome.com/ece9ba6ec0.js" crossorigin="anonymous"></script>
    <script src="https://unpkg.com/shortid-dist@1.0.5/dist/shortid-2.2.13.js"></script>
</head>
   
<body>
   
      
      
    <header>
        <nav>
            <div class="outer">
                <div class="function">
                    <div class="green color">New</div>
                    <div class="yellow color ">Progress</div>
                    <div class="red color">Completed</div>
                    <div class="black color">Blacklog</div>
                </div>
           


                <div class="action">
                    <div class="add">
                        <i class="fa-solid fa-plus"></i>
                    </div>
               
                    <div class="remove-btn">  
                        <i class="fa-regular fa-trash-can"></i>
                    </div>
                </div>
            </div>
        </nav>
    </header>

    <main class="body" >
        <div class="stick">
            <!-- <div class="notes">
            <div class="pad">
            <div class="ncolor"></div>
            <div class="no">001</div>
            <div class="text">Check the Mail </div>
            <div class="lock">
                <i class="fa-solid fa-lock"></i>
            </div> 
            </div> -->
            </div> 
        </div>

    </main>

<div class="window">   
        <div class="adds">
            <textarea name="textarea" id="textarea"></textarea>
        </div>
     <div class="bar">
            <div class="sidebar">
                <div  class="green color">New</div>
                <div class="yellow color ">Progress</div>
                <div class="red color">Completed</div>
                <div class="black color">Blacklog</div>
            </div>
        </div>
</div>


<script src="kandanboard.js"></script>

  
    
    
   
</body>
</html>
