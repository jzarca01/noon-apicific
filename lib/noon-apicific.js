const axios = require('axios')

const MAX_RESULTS_PER_PAGE = 20

class NoonApicific {
    constructor(config) {
        this.request = axios.create({
          baseURL: 'https://beta.whitelabel.cool/api',
          headers: {
            'Client': config.clientId
          }
        })
      }

    async getCollections() {
        try {
            const collections = await this.request({
                method: 'GET',
                url: '/collections',
                responseType: 'json'
            })
            return collections.data
        }
        catch(err) {
            console.log('error with getCollections', err)
        }
    }

    async getLatestMixtape() {
        try {
            const latestMixtape = await this.request({
                method: 'GET',
                url: '/mixtapes/latest',
                responseType: 'json'
            })
            return latestMixtape.data
        }
        catch(err) {
            console.log('error with getLatestMixtape', err)
        }
    }

    async getMixtape(slug) {
        try {
            if(!slug) {
                throw new Error('No slug provided')
            }
            const mixtape = await this.request({
                method: 'GET',
                url: '/tracks/',
                params: {
                    mixtape: slug
                },
                responseType: 'json'
            })
            return mixtape.data
        }
        catch(err) {
            console.log('error with getLatestMixtape', err)
        }
    }

    async getResultsNumber(search = 'mixtapes', collection = 'los-angeles') {
        try {
          const results = await this.getResults(search, collection)
          return results.count
        } catch (error) {
          console.log('error with getResultsNumber', error)
        }
    }

    async getResults(search = 'mixtapes', collection = 'los-angeles', page = '1') {
        try {
            let response = await this.request({
                method: 'GET',
                url: `/${search}`,
                params: {
                    collection: collection,
                    page: page
                },
                responseType: 'json'
                })
            return response.data
        } catch (error) {
            console.log('error with getResults', error)
        }
    }

    async getMixtapesByCollection(collection = 'los-angeles', maxResults = '50') {
        try {
            const resultsNumber = await this.getResultsNumber('mixtapes', collection)
            const numberOfPages = Math.floor(resultsNumber / 10) + 1

            if(maxResults === 'ALL') {
              maxResults = resultsNumber
            }

            if(resultsNumber <= MAX_RESULTS_PER_PAGE) {
              return await this.getResults('mixtapes', collection)
            }
            else {
              let mixtapes = []

              for(let currentPage = 1, totalFetchedResults = 0; (currentPage < numberOfPages) && (totalFetchedResults < parseInt(maxResults)); currentPage++) {
                let moreMixtapes = await this.getResults('mixtapes', collection, currentPage)
                totalFetchedResults += MAX_RESULTS_PER_PAGE
                mixtapes.push(moreMixtapes.results)
              }
              return {
                total: resultsNumber,
                mixtapes: mixtapes.reduce((acc, el) => [...acc, ...el] , [])
              }
            }
        } catch (error) {
            console.log('error with getMixtapesByCollection', error)
        }
    }

    async getMixtapes(maxResults = '50') {
        try {
            const resultsNumber = await this.getResultsNumber('mixtapes', null)
            const numberOfPages = Math.floor(resultsNumber / 10) + 1

            if(maxResults === 'ALL') {
              maxResults = resultsNumber
            }

            if(resultsNumber <= MAX_RESULTS_PER_PAGE) {
              return await this.getResults('mixtapes', null)
            }
            else {
              let mixtapes = []

              for(let currentPage = 1, totalFetchedResults = 0; (currentPage < numberOfPages) && (totalFetchedResults < parseInt(maxResults)); currentPage++) {
                let moreMixtapes = await this.getResults('mixtapes', null, currentPage)
                totalFetchedResults += MAX_RESULTS_PER_PAGE
                mixtapes.push(moreMixtapes.results)
              }
              return {
                total: resultsNumber,
                mixtapes: mixtapes.reduce((acc, el) => [...acc, ...el] , [])
              }
            }
        } catch (error) {
            console.log('error with getMixtapes', error)
        }
    }

    async getTracks(maxResults = '50') {
        try {
            const resultsNumber = await this.getResultsNumber('tracks', null)
            const numberOfPages = Math.floor(resultsNumber / 10) + 1

            if(maxResults === 'ALL') {
              maxResults = resultsNumber
            }

            if(resultsNumber <= MAX_RESULTS_PER_PAGE) {
              return await this.getResults('tracks', null)
            }
            else {
              let tracks = []

              for(let currentPage = 1, totalFetchedResults = 0; (currentPage < numberOfPages) && (totalFetchedResults < parseInt(maxResults)); currentPage++) {
                let moreTracks = await this.getResults('tracks', null, currentPage)
                totalFetchedResults += MAX_RESULTS_PER_PAGE
                tracks.push(moreTracks.results)
              }
              return {
                total: resultsNumber,
                tracks: tracks.reduce((acc, el) => [...acc, ...el] , [])
              }
            }
        } catch (error) {
            console.log('error with getTracks', error)
        }
    }
}

module.exports = NoonApicific