$('#searchMovieForm').submit((event) => {
  event.preventDefault();
  let movieTerm = $('#movie_search_term').val().trim();

  if (movieTerm.length > 0) {
    $('#error').hide();
    $('#movieDetails').hide();
    $('#rootLink').hide();
    $('#searchResults').empty();

    axios
      .get('https://www.omdbapi.com/?apikey=CS546', {
        params: {
          s: movieTerm,
        },
      })
      .then(function (response) {
        if (response.data.Response == 'False') {
          $('#error').show();
          $('#error').html(response.data.Error);
          $('#searchResults').hide();
          $('#movieDetails').hide();
          $('#rootLink').hide();
          $('#movie_search_term').focus();
        } else {
          var page1Response = response.data;
          var page2Response = null;
          var bothPagesResults = response.data;
          // console.log(bothPagesResults);
          if (page1Response.totalResults > 10) {
            axios
              .get('https://www.omdbapi.com/?apikey=CS546', {
                params: {
                  s: movieTerm,
                  page: 2,
                },
              })
              .then(function (response) {
                page2Response = response.data;
                bothPagesResults.Search = [
                  ...page1Response.Search,
                  ...page2Response.Search,
                ];
                let ul = $('#searchResults');
                for (let i = 0; i < bothPagesResults.Search.length; i++) {
                  let li = $('<li></li>');
                  let aElement = $('<a></a>');
                  aElement.text(bothPagesResults.Search[i].Title);
                  aElement.attr('href', 'javascript:void(0)');
                  aElement.attr('data-id', bothPagesResults.Search[i].imdbID);
                  li.append(aElement);
                  ul.append(li);
                }
                ul.show();
                $('#rootLink').show();
                $('#movieDetails').hide();
              })
              .catch(function (error) {
                console.error('Error: ', error);
              });
          } else {
            let ul = $('#searchResults');
            for (
              let index = 0;
              index < bothPagesResults.Search.length;
              index++
            ) {
              let li = $('<li></li>');
              let aElement = $('<a></a>');
              aElement.text(bothPagesResults.Search[index].Title);
              aElement.attr('href', 'javascript:void(0)');
              aElement.attr('data-id', bothPagesResults.Search[index].imdbID);
              li.append(aElement);
              ul.append(li);
            }
            ul.show();
            $('#rootLink').show();
            $('#movieDetails').hide();
          }
        }
      })
      .catch(function (error) {
        console.log('Error:', error);
      });
  } else {
    $('#error').show();
    $('#error').html('You must enter an input value');
    $('#searchResults').hide();
    $('#movieDetails').hide();
    $('#rootLink').hide();
    $('#movie_search_term').focus();
  }
});

$(document).on('click', '#searchResults li a', function (event) {
  event.preventDefault();

  $('#searchResults').hide();
  $('#movieDetails').empty();
  axios
    .get('https://www.omdbapi.com/?apikey=CS546', {
      params: {
        i: $(this).attr('data-id'),
      },
    })
    .then(function (response) {
      let movieDetails = response.data;
      let movieDetailsDiv = $('#movieDetails');
      let article = $('<article></article>');

      let h1 = $('<h1></h1>');
      h1.append(movieDetails.Title);

      let img = $('<img >');
      if (movieDetails.Poster == 'N/A') {
        movieDetails.Poster = '/public/no_image.jpeg';
      }
      img.attr('alt', movieDetails.Title + ' Poster');
      img.attr('src', movieDetails.Poster);

      let h2 = $('<h2></h2>');
      h2.append('Plot');

      let p = $('<p></p>');
      p.text(movieDetails.Plot);

      let section = $('<section></section>');

      let h3 = $('<h3></h3>');
      h3.append('Info');

      let dl = $('<dl></dl>');

      let dt = $('<dt></dt>');
      dt.append('Year Released:');
      let dt1 = $('<dt></dt>');
      dt1.append('Rated:');
      let dt2 = $('<dt></dt>');
      dt2.append('Runtime:');
      let dt3 = $('<dt></dt>');
      dt3.append('Genre(s):');
      let dt4 = $('<dt></dt>');
      dt4.append('Box Office Earnings:');
      let dt5 = $('<dt></dt>');
      dt5.append('DVD Release Date:');

      let dd = $('<dd></dd>');
      dd.append(movieDetails.Year);
      let dd1 = $('<dd></dd>');
      dd1.append(movieDetails.Rated);
      let dd2 = $('<dd></dd>');
      dd2.append(movieDetails.Runtime);
      let dd3 = $('<dd></dd>');
      dd3.append(movieDetails.Genre);
      let dd4 = $('<dd></dd>');
      dd4.append(movieDetails.BoxOffice);
      let dd5 = $('<dd></dd>');
      dd5.append(movieDetails.DVD);

      dl.append(dt);
      dl.append(dd);
      dl.append(dt1);
      dl.append(dd1);
      dl.append(dt2);
      dl.append(dd2);
      dl.append(dt3);
      dl.append(dd3);
      dl.append(dt4);
      dl.append(dd4);
      dl.append(dt5);
      dl.append(dd5);

      section.append(h3);
      section.append(dl);

      let section1 = $('<section></section>');

      let h4 = $('<h4></h4>');
      h4.append('Cast and Crew');

      let p1 = $('<p></p>');
      let p2 = $('<p></p>');
      let p3 = $('<p></p>');
      let strong1 = $('<strong></strong>');
      let strong2 = $('<strong></strong>');
      let strong3 = $('<strong></strong>');
      strong1.append('Director: ');
      strong2.append('Writer: ');
      strong3.append('Cast: ');

      p1.append(strong1);
      p1.append(movieDetails.Director);

      p2.append(strong2);
      p2.append(movieDetails.Writer);

      p3.append(strong3);
      p3.append(movieDetails.Actors);

      section1.append(h4);
      section1.append(p1);
      section1.append(p2);
      section1.append(p3);

      let section2 = $('<section></section>');

      let h42 = $('<h4></h4>');
      h42.append('Ratings');

      let table = $('<table></table>');
      table.attr('class', 'my_coolratings_table');

      let tr = $('<tr></tr>');

      let th = $('<th></th>');
      let th1 = $('<th></th>');

      th.append('Source');
      th1.append('Rating');

      tr.append(th);
      tr.append(th1);

      table.append(tr);

      if (movieDetails.Ratings.length <= 0) {
        table.append('N/A');
      } else {
        for (let i = 0; i < movieDetails.Ratings.length; i++) {
          let tr1 = $('<tr></tr>');
          let td1 = $('<td></td>');
          let td2 = $('<td></td>');

          td1.append(movieDetails.Ratings[i].Source);
          td2.append(movieDetails.Ratings[i].Value);

          tr1.append(td1);
          tr1.append(td2);

          table.append(tr1);
        }
      }
      section2.append(table);

      article.append(h1);
      article.append(img);
      article.append(h2);
      article.append(p);
      article.append(section);
      article.append(section1);
      article.append(section2);

      movieDetailsDiv.append(article);
      movieDetailsDiv.show();
      $('#rootLink').show();
    })
    .catch(function (error) {
      console.error('Error: ', error);
    });
});
