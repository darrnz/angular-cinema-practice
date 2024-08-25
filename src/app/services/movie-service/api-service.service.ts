import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMovies } from 'src/app/types/movies';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  private apiUrl = 'https://api.themoviedb.org/3/';
  private apiKey = 'a9b1820ba1f9708d20a7744b7171e754'; //process.env['API_KEY']

  constructor(private http: HttpClient) {}

  public movieList: IMovies[] = [
    {
        "image": "https://image.tmdb.org/t/p/w500//8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
        "title": "Deadpool & Wolverine",
        "release": "2024-07-24",
        "id": 533535,
        "overview": "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.",
        "originalLanguage": "en",
        "voteAverage": 7.76,
        "timesheet": [
            "10:00 AM",
            "1:00 PM",
            "4:00 PM",
            "7:00 PM",
            "10:00 PM"
        ]
    },
    {
        "image": "https://image.tmdb.org/t/p/w500//vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
        "title": "Inside Out 2",
        "release": "2024-06-11",
        "id": 1022789,
        "overview": "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who’ve long been running a successful operation by all accounts, aren’t sure how to feel when Anxiety shows up. And it looks like she’s not alone.",
        "originalLanguage": "en",
        "voteAverage": 7.651,
        "timesheet": [
            "9:30 AM",
            "12:30 PM",
            "3:30 PM",
            "6:30 PM",
            "9:30 PM"
        ]
    },
    {
        "image": "https://image.tmdb.org/t/p/w500//pjnD08FlMAIXsfOLKQbvmO0f0MD.jpg",
        "title": "Twisters",
        "release": "2024-07-10",
        "id": 718821,
        "overview": "As storm season intensifies, the paths of former storm chaser Kate Carter and reckless social-media superstar Tyler Owens collide when terrifying phenomena never seen before are unleashed. The pair and their competing teams find themselves squarely in the paths of multiple storm systems converging over central Oklahoma in the fight of their lives.",
        "originalLanguage": "en",
        "voteAverage": 7.046,
        "timesheet": [
            "11:00 AM",
            "2:00 PM",
            "5:00 PM",
            "8:00 PM"
        ]
    },
    {
        "image": "https://image.tmdb.org/t/p/w500//wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
        "title": "Despicable Me 4",
        "release": "2024-06-20",
        "id": 519182,
        "overview": "Gru and Lucy and their girls—Margo, Edith and Agnes—welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Gru also faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.",
        "originalLanguage": "en",
        "voteAverage": 7.312,
        "timesheet": [
            "10:15 AM",
            "1:15 PM",
            "4:15 PM",
            "7:15 PM",
            "10:15 PM"
        ]
    },
    {
        "image": "https://image.tmdb.org/t/p/w500//oGythE98MYleE6mZlGs5oBGkux1.jpg",
        "title": "Bad Boys: Ride or Die",
        "release": "2024-06-05",
        "id": 573435,
        "overview": "After their late former Captain is framed, Lowrey and Burnett try to clear his name, only to end up on the run themselves.",
        "originalLanguage": "en",
        "voteAverage": 7.596,
        "timesheet": [
            "9:00 AM",
            "12:00 PM",
            "3:00 PM",
            "6:00 PM",
            "9:00 PM"
        ]
    },
    {
        "image": "https://image.tmdb.org/t/p/w500//m2zXTuNPkywdYLyWlVyJZW2QOJH.jpg",
        "title": "Kill",
        "release": "2024-07-03",
        "id": 1160018,
        "overview": "When an army commando finds out his true love is engaged against her will, he boards a New Dehli-bound train in a daring quest to derail the arranged marriage. But when a gang of knife-wielding thieves begin to terrorize innocent passengers on his train, the commando takes them on himself in a death-defying kill-spree to save those around him — turning what should have been a typical commute into an adrenaline-fueled thrill ride.",
        "originalLanguage": "hi",
        "voteAverage": 7.056,
        "timesheet": [
            "11:30 AM",
            "2:30 PM",
            "5:30 PM",
            "8:30 PM"
        ]
    },
    {
        "image": "https://image.tmdb.org/t/p/w500//b33nnKl1GSFbao4l3fZDDqsMx0F.jpg",
        "title": "Alien: Romulus",
        "release": "2024-08-13",
        "id": 945961,
        "overview": "While scavenging the deep ends of a derelict space station, a group of young space colonizers come face to face with the most terrifying life form in the universe.",
        "originalLanguage": "en",
        "voteAverage": 7.2,
        "timesheet": [
            "10:45 AM",
            "1:45 PM",
            "4:45 PM",
            "7:45 PM",
            "10:45 PM"
        ]
    },
    {
        "image": "https://image.tmdb.org/t/p/w500//AjV6jFJ2YFIluYo4GQf13AA1tqu.jpg",
        "title": "It Ends with Us",
        "release": "2024-08-07",
        "id": 1079091,
        "overview": "Lily Bloom overcomes a traumatic childhood to embark on a new life in Boston and chase a lifelong dream of opening her own business. A chance meeting with charming neurosurgeon Ryle Kincaid sparks an intense connection, but as the two fall deeply in love, Lily begins to see sides of Ryle that remind her of her parents' relationship.",
        "originalLanguage": "en",
        "voteAverage": 6.996,
        "timesheet": [
            "9:15 AM",
            "12:15 PM",
            "3:15 PM",
            "6:15 PM",
            "9:15 PM"
        ]
    },
    {
        "image": "https://image.tmdb.org/t/p/w500//hU42CRk14JuPEdqZG3AWmagiPAP.jpg",
        "title": "A Quiet Place: Day One",
        "release": "2024-06-26",
        "id": 762441,
        "overview": "As New York City is invaded by alien creatures who hunt by sound, a woman named Sam fights to survive with her cat.",
        "originalLanguage": "en",
        "voteAverage": 6.885,
        "timesheet": [
            "10:00 AM",
            "1:00 PM",
            "4:00 PM",
            "7:00 PM",
            "10:00 PM"
        ]
    },
    {
        "image": "https://image.tmdb.org/t/p/w500//30YnfZdMNIV7noWLdvmcJS0cbnQ.jpg",
        "title": "Saving Bikini Bottom: The Sandy Cheeks Movie",
        "release": "2024-08-01",
        "id": 831815,
        "overview": "When Bikini Bottom is scooped from the ocean, scientific squirrel Sandy Cheeks and her pal SpongeBob SquarePants saddle up for Texas to save their town.",
        "originalLanguage": "en",
        "voteAverage": 6.426,
        "timesheet": [
            "11:00 AM",
            "2:00 PM",
            "5:00 PM",
            "8:00 PM"
        ]
    }
];

  getMovies(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}movie/popular?api_key=${this.apiKey}&language`,
    );
  }

  // setMovieList(movies: IMovies[]) {
  //   this.movieList = movies;
  // }
}
