// axios.get('http://www.thecolorapi.com/id?hex=24B1E0')
//     .then(function (response) {
//         alert(response.hex.value);
//     })
//     .catch(function (error) {
//         console.log(error);
//     })

function addComment() {
    let movieId = document.getElementById("movieId").getAttribute("movie-id")
    let reviewId = document.getElementById("reviewId").value
    let comment = {};
    const inputs = document.getElementsByClassName('form-control');
    for (var i = 0; i < inputs.length; i++) {
        comment[inputs[i].name] = inputs[i].value;
    }
    console.log(comment)
// NEEDS MOVIEID and REVIEWID TO BE DEFINED
    axios.post(`/movies/${movieId}/reviews/${reviewId}/comments`, comment)
        .then(function (response) {
            console.log(response.data);
            console.log(response.data.comment);
            document.getElementById("newComment").reset();
            document.getElementById("comments").innerHTML =
                `
                <div class = "card">
                    <div class = "card-block">
                        <h4 class = "card-title">${comment.title}</h4>
                        <p class = "card-text">${comment.content}</p>
                        <p>
                            <form method = "POST" action = "/reviews/comments/${response._id}?_method=DELETE">
                                <button class = "btn btn-link" type = "submit">Delete</button>
                            </form>
                        </p>
                    </div>
                </div>
                ` + document.getElementById("comments").innerHTML; 
                
                document.getElementById("comment-form").reset()
            
        })
        .catch(function (error) {
            console.log(error);
            alert('There was a problem saving your comment. Please try again.')
        });

//     axios.post('/user', comment)
//         .then(function (response) {
//             console.log(response);
//             this.reset();
//             document.getElementById('comments').prepend(
//                 `
//                 <div class = "card">
//                     <div class = "card-block">
//                         <h4 class = "card-title">${response.title}</h4>
//                         <p class = "card-text">${response.content}</p>
//                         <p>
//                             <form method = "POST" action = "/reviews/comments/${response._id}?_method=DELETE">
//                                 <button class = "btn btn-link" type = "submit">Delete</button>
//                             </form>
//                         </p>
//                     </div>
//                 </div>
//                 `
//             );
//         })
}