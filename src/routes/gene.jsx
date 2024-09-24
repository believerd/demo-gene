import { useLoaderData } from "react-router-dom"
import genes from '../assets/example-data.json'
import Histogram from "../Histogram"

const Gene = () => {
  const gene = useLoaderData()
  return (
    <div id="gene">
      <h1>{gene.Gene}</h1>
      <ul>
        <li>
          Temp37_effect_size: {gene.Temp37_effect_size}
        </li>
        <li>
          Temp37_fdr: {gene.Temp37_fdr}
        </li>
        <li >
          <Histogram data={genes} selectedGene={gene} />
        </li>
      </ul>
    </div>
  )
}

const loader = ({ params }) => {
  const geneId = params.geneId
  const gene = genes.find(gene => gene.Gene === geneId)
  return gene
}

export default Gene
export { loader }