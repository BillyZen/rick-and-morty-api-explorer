import { gql } from "@apollo/client";

export const queries = {
  characters: gql`
    query GetCharacterData($page: Int!, $name: String) {
      characters(page: $page, filter: { name: $name }) {
        info {
          count
          pages
          next
          prev
        }
        results {
          image
          name
          status
          species
          type
          gender
          origin {
            name
            type
            dimension
            residents {
              name
            }
          }
          location {
            name
            type
            dimension
            residents {
              name
            }
          }
          episode {
            name
            air_date
            episode
            characters {
              name
            }
          }
        }
      }
    }
  `,
  episodes: gql`
    query GetEpisodeData($page: Int!, $name: String) {
      episodes(page: $page, filter: { name: $name }) {
        info {
          count
          pages
          next
          prev
        }
        results {
          id
          name
          air_date
          episode
          characters {
            name
            status
            species
            type
            gender
            image
            origin {
              name
            }
            location {
              name
            }
            episode {
              name
            }
          }
        }
      }
    }
  `,
  locations: gql`
    query GetLocationData($page: Int!, $name: String) {
      locations(page: $page, filter: { name: $name }) {
        info {
          count
          pages
          next
          prev
        }
        results {
          name
          type
          dimension
          residents {
            name
            image
            type
            status
            species
            gender
            origin {
              name
            }
            episode {
              name
            }
          }
        }
      }
    }
  `,
};
