import { useState } from "react";

const tratamentos = [
  { id: 1, nome: "Corte de Cabelo", preco: 50 },
  { id: 2, nome: "Escova", preco: 40 },
  { id: 3, nome: "Coloração", preco: 120 },
  { id: 4, nome: "Hidratação", preco: 70 },
];

export default function AgendamentoSalao() {
  const [tratamentoSelecionado, setTratamentoSelecionado] = useState(null);
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleAgendar = () => {
    if (!tratamentoSelecionado || !data || !hora) {
      setMensagem("Preencha todos os campos para agendar.");
      return;
    }

    const evento = {
      text: `Agendamento: ${tratamentoSelecionado.nome}`,
      dates: [`${data}T${hora}/${data}T${hora}`],
      details: `Preço: R$ ${tratamentoSelecionado.preco}`,
    };

    const link = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      evento.text
    )}&dates=${evento.dates[0].replace(/[-:]/g, "")}&details=${encodeURIComponent(
      evento.details
    )}`;

    window.open(link, "_blank");
    setMensagem("Agendamento criado! Verifique sua agenda do Google.");
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <h1 className="text-xl font-bold mb-4 text-center">Agende seu Tratamento</h1>

        <label className="block mb-2 font-medium">Escolha o tratamento:</label>
        <select
          className="w-full p-2 mb-4 border rounded"
          onChange={(e) =>
            setTratamentoSelecionado(
              tratamentos.find((t) => t.id === parseInt(e.target.value))
            )
          }
        >
          <option value="">Selecione</option>
          {tratamentos.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nome} - R$ {t.preco}
            </option>
          ))}
        </select>

        <label className="block mb-2 font-medium">Data:</label>
        <input
          type="date"
          className="w-full p-2 mb-4 border rounded"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />

        <label className="block mb-2 font-medium">Hora:</label>
        <input
          type="time"
          className="w-full p-2 mb-4 border rounded"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
        />

        <button
          onClick={handleAgendar}
          className="w-full bg-pink-500 text-white py-2 rounded-xl hover:bg-pink-600"
        >
          Agendar Tratamento
        </button>

        {mensagem && (
          <p className="text-center text-sm text-green-600 mt-4">{mensagem}</p>
        )}
      </div>
    </div>
  );
}
