import React, { Component } from 'react'
import HomeComponent from '../../components/Home'
import ListArticles from '../ListArticles'


export default class Home extends Component {
    render() {
        return (
            <HomeComponent>
              <ListArticles/>
            </HomeComponent>
        )
    }
}