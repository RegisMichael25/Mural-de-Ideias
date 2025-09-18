import { useState, useEffect } from 'react';
import axios from 'axios';

function IdeaForm({ onIdeaAdded }) {
  const [title, setTitle] = useState('');
  const [textarea, setTextarea] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !textarea.trim()) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await axios.post('http://localhost:8080/ideias', { title, textarea });
      onIdeaAdded(response.data);
      setTitle('');
      setTextarea('');
    } catch (error) {
      console.error('Erro ao criar ideia:', error);
      alert('Não foi possível adicionar a ideia. Verifique se o backend está rodando.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-12 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Qual sua próxima grande ideia?</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Título da Ideia"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <textarea
          placeholder="Descreva sua ideia..."
          value={textarea}
          onChange={(e) => setTextarea(e.target.value)}
          rows="4"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-blue-300"
      >
        {isSubmitting ? 'Enviando...' : 'Adicionar Ideia'}
      </button>
    </form>
  );
}

function IdeaCard({ idea, onIdeaDeleted }) {
    const handleDelete = async () => {
        if (window.confirm(`Tem certeza que deseja apagar a ideia "${idea.title}"?`)) {
            try {
                await axios.delete(`http://localhost:8080/ideias/${idea.id}`);
                onIdeaDeleted(idea.id); 
            } catch (error) {
                console.error('Erro ao deletar ideia:', error);
                alert('Não foi possível apagar a ideia.');
            }
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 relative group">
            <button
                onClick={handleDelete}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                aria-label="Deletar ideia"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{idea.title}</h3>
            <p className="text-gray-600">{idea.textarea}</p>
        </div>
    );
}


function App() {
  const [ideas, setIdeas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await axios.get('http://localhost:8080/ideias');
        setIdeas(response.data.sort((a, b) => b.id - a.id));
      } catch (err) {
        console.error('Falha ao buscar dados:', err);
        setError('Não foi possível carregar as ideias. O backend está rodando?');
      } finally {
        setIsLoading(false);
      }
    };
    fetchIdeas();
  }, []);

  const handleIdeaAdded = (newIdea) => {
    setIdeas([newIdea, ...ideas]);
  };

  const handleIdeaDeleted = (deletedIdeaId) => {
    setIdeas(ideas.filter(idea => idea.id !== deletedIdeaId));
  };


  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-center text-gray-800">Mural de Ideias 💡</h1>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <IdeaForm onIdeaAdded={handleIdeaAdded} />

        {isLoading && <p className="text-center text-gray-500">Carregando ideias...</p>}
        {error && <p className="text-center text-red-500 bg-red-100 p-4 rounded-lg">{error}</p>}
        
        {!isLoading && !error && (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ideas.map(idea => (
              <IdeaCard key={idea.id} idea={idea} onIdeaDeleted={handleIdeaDeleted}/>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;