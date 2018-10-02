// axios.get('http://www.thecolorapi.com/id?hex=24B1E0')
//     .then(function (response) {
//         alert(response.hex.value);
//     })
//     .catch(function (error) {
//         console.log(error);
//     })

// $("#delete-comment").click(function() {
//     console.log('click!');
//     let commentId = this.getAttribute('data-comment-id')
//     console.log(commentId)
//     console.log(commentId)

//     axios.delete(`/reviews/comments/${commentId}`)
//         .then(response => {
//             console.log(response)
//             console.log(commentId)
//             $(`#${commentId}`).remove()
//         })
//         .catch(error => {
//             // console.log('this is error')
//             // console.log(error)
//             // alert('There was an error deleting this comment.')
//         });
// })

// document.getElementsByClassName('delete-comment').addEventListener('click', function(e) {
//     console.log("click!")
//     let commentId = this.getAttribute('data-comment-id')
//     axios.delete(`/reviews/comments/${commentId}`)
//         .then(response => {
//             console.log(response)
//             comment = document.getElementById(commentId)
//             comment.parentNode.removeChild(comment);
//         })
//         .catch(error => {
//             console.log(error)
//             alert('There was an error deleting this comment.')
//         });
// })

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
            window.location.reload();
            // document.getElementById("newComment").reset();
            // document.getElementById("comments").innerHTML =
            //     `
            //     <div class = "card" id="comment${this._id}">
            //         <div class = "card-block">
            //             <h4 class = "card-title">${comment.title}</h4>
            //             <p class = "card-text">${comment.content}</p>
            //             <p>
            //             <button class="btn btn-link" id = "delete${this._id}" data-comment-id="${this._id}">Delete</button>
            //             </p>
            //         </div>
            //     </div>
            //     ` + document.getElementById("comments").innerHTML;


//                 <div class = "card" id="comment{{this._id}}">


//     <div class = "card-block">
//         <h4 class = "card-title">{{this.title}}</h4>
//         {{!-- <p>{{this}}</p> --}}
//         <p class = "card-text">{{this.content}}</p>
//         <p>
//             <button class="btn btn-link" id = "delete{{this._id}}" data-comment-id="{{this._id}}">Delete</button>
//             {{!-- <button class="btn btn-link delete-comment" data-comment-id="{{this._id}}">Delete</button> --}}
//         </p>
//     </div>
// </div>
            document.getElementById("comment-form").reset()
            // document.querySelector('.delete-comment').addEventListener('click', (e) => {
            //     console.log("click!")
            //     let commentId = this.getAttribute('data-comment-id')
            //     axios.delete(`/reviews/comments/${commentId}`)
            //         .then(response => {
            //             console.log(response)
            //         })
            //         .catch(error => {
            //             console.log(error)
            //         });
            // })

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