import { Link, Outlet, useLoaderData } from "react-router-dom"
import genes from '../assets/example-data.json'
import { useState } from "react"

const Root = () => {
  const [q, setQ] = useState("")
  const [filteredGenes, setFilteredGenes] = useState(genes)
  return (
    <>
      <div id="sidebar">
        <h1>Demo Database</h1>
        <div>
          <form role="search">
            <input placeholder="search" value={q} onChange={(e) => setQ(e.target.value)} />
          </form>
          <form>
            <button onClick={(e) => {
              e.preventDefault()
              setFilteredGenes(genes.filter(gene => gene.Gene.includes(q)))
              setQ("")
            }
              }>Search</button>
          </form>
        </div>

        <nav>
          <ul>
            {filteredGenes.map(gene => <li><Link to={`/gene/${gene.Gene}`}>{gene.Gene}</Link></li>)}
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  )
}

const loader = () => {
  return genes
}

export default Root
export { loader }