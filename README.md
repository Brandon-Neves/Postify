<h1 align="center">  Postify  🎲  &nbsp  </h1>

## 🎲 About

With the increase in companies’ presence on social media, it is essential to have an efficient tool that allows scheduling, controlling, and monitoring of posts on various social media platforms

## 🎲 Description

The Social Postify” is a web application that enables users to create and schedule posts for various social networks such as Facebook, Instagram, Twitter, and LinkedIn. Users can create customized posts with images, titles, text, and select specific dates and times for each post. The system supports scheduling multiple posts and provides a clear overview of the scheduled posts.


## :hammer: Features

:ballot_box_with_check: GET `/health` - This endpoint is only to ensure that the application is up and running. It returns the message "I'm okay!" with the status code 200 OK.

:ballot_box_with_check: POST `/medias` - It must receive (through the request body), the parameters: title and username.
```bash
{
	"title": "Instagram",
	"username": "myusername",
}
```
In the absence of mandatory fields, return status code 400 Bad Request.

Prevent the creation of a new record with the same combination of title and username (if it exists, return status code 409 Conflict).

:ballot_box_with_check: GET `/medias` - It must return all registered media in the system in the following format.
```bash
[
	{
		"id": 1,
		"title": "Instagram",
		"username": "myusername", //
	},
	{
		"id": 2,
		"title": "Twitter",
		"username": "myusername",
	}
]
```
If there is no registered media, return an empty array.

:ballot_box_with_check: GET `/medias/:id` - It must return the record compatible with the provided id:
```bash
[
	{
		"id": 1,
		"title": "Instagram",
		"username": "myusername",
	}
]
```
f there is no compatible record, return status code 404 Not Found.

:ballot_box_with_check: PUT `/medias/:id` - It must update the record compatible with the provided id:
```bash
[
	{
		"title": "Instagram",
		"username": "myusername-2",
	}
]
```
If there is no compatible record, return status code 404 Not Found.

The change must not violate the unique title and username rule. If it does, return status code 409 Conflict.



:ballot_box_with_check: DELETE `/medias/:id` - It must delete the record compatible with the provided id.

If there is no compatible record, return status code 404 Not Found.

The media can only be deleted if it is not part of any scheduled or published post. In this case, return status code 403 Forbidden.

:ballot_box_with_check: POST `/posts` - It must receive (through the request body), the parameters: title, text, and image, the latter being optional.
```bash
{
	"title": "Why you should have a guinea pig?",
	"text": "https://www.guineapigs.com/why-you-should-guinea",
}
```
In the absence of mandatory fields, return status code 400 Bad Request.

:ballot_box_with_check: GET `/posts` - It must return all registered posts in the system in the following format:
```bash
[
	{
		"id": 1
		"title": "Why you should have a guinea pig?",
		"text": "https://www.guineapigs.com/why-you-should-guinea",
	},
	{
		"id": 2,
		"title": "Man dies after coding for 400 hours no stop",
		"text": "https://www.devnews.com/dies-after-400",
		"image": "https://www.devnews.com/dead-dev.jpg"
	}
]
```
If there are no registered posts, return an empty array.

:ballot_box_with_check: PUT `/posts/:id` - It must update the record compatible with the provided id:
```bash
[
	{
		"title": "Why you should't have a guinea pig?",
		"text": "https://www.guineapigs.com/why-you-should-guinea",
	},
]
```
If there is no compatible record, return status code 404 Not Found.

:ballot_box_with_check: DELETE `/posts/:id` - It must delete the record compatible with the provided id.

If there is no compatible record, return status code 404 Not Found.

The post can only be deleted if it is not part of any scheduled or published post. In this case, return status code 403 Forbidden.

:ballot_box_with_check: POST `/publications` - It must receive (through the request body), the parameters: mediaId, postId, and date:
```bash
{
	"mediaId": 1,
	"postId": 1,
	"date": "2023-08-21T13:25:17.352Z"
}
```
In the absence of mandatory fields, return status code 400 Bad Request.

If there are no compatible records with mediaId and postId, return status code 404 Not Found.

:ballot_box_with_check: GET `/publications` - It must return all registered posts in the system in the following format:
```bash[
	{
		"id": 1,
		"mediaId": 1,
		"postId": 1,
		"date": "2023-08-21T13:25:17.352Z"
	},
	{
		"id": 1,
		"mediaId": 2,
		"postId": 1,
		"date": "2023-08-21T13:25:17.352Z"
	},
]
```
If there are no registered publications, return an empty array.

Special filters: published (true/false): posts that have already been published or not. after (date): posts after a certain date.

:ballot_box_with_check: GET `/publications/:id` - It must return the record compatible with the provided id:
```bash
[
	{
		"id": 1,
		"mediaId": 1,
		"postId": 1,
		"date": "2023-08-21T13:25:17.352Z"
	},
]
```
If there is no compatible record, return status code 404 Not Found.

:ballot_box_with_check: PUT `/publications/:id` - It must update the record compatible with the provided id:
```bash
[
	{
		"id": 1,
		"mediaId": 1,
		"postId": 1,
		"date": "2023-09-21T13:25:17.352Z"
	},
]
```
It should not be possible to change the information of a record of a publication that has already been published, only scheduled ones. In this case, return status code 403 Forbidden.

If there is no compatible record, return status code `404 Not found.

:ballot_box_with_check: DELETE `/publications/:id` - It must delete the record compatible with the provided id.

If there is no compatible record, return status code 404 Not Found.


## :man_technologist: Technologies
<p align="center">
    <img style='margin: 5px;' src='https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white'>
    <img style='margin: 5px;' src='https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white'>
    <img style='margin: 5px;' src='https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white'>
    <img style='margin: 5px;' src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/>
    <img style='margin: 5px;' src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white"/>
    <img style='margin: 5px;' src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white"/>
</p>


## Installation

Clone this repository
```bash
git clone https://github.com/Brandon-Neves/Postify
```
2. Clone the front-end repository at https://github.com/Brandon-Neves/Postify and follow the instructions to run
```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
