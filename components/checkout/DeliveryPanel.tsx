"use client";

import { Home } from "lucide-react";
import { formatCep } from "@/lib/masks";

const STATES = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS",
  "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC",
  "SP", "SE", "TO",
];

export default function DeliveryPanel() {
  return (
    <div className="panel">
      <div className="panel-header">
        <div className="panel-icon">
          <Home size={16} strokeWidth={2} />
        </div>
        <h2>Endereço de Entrega</h2>
      </div>
      <div className="panel-body">
        <div className="form-group addr-full">
          <label className="form-label" htmlFor="cep">
            CEP
          </label>
          <input
            className="form-input"
            id="cep"
            placeholder="00000-000"
            maxLength={9}
            onChange={(e) => {
              e.target.value = formatCep(e.target.value);
            }}
          />
        </div>
        <div className="addr-grid">
          <div className="form-group addr-full">
            <label className="form-label" htmlFor="street">
              Rua / Logradouro
            </label>
            <input
              className="form-input"
              id="street"
              placeholder="Rua das Flores"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="num">
              Número
            </label>
            <input className="form-input" id="num" placeholder="123" />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="comp">
              Complemento
            </label>
            <input
              className="form-input"
              id="comp"
              placeholder="Apto, bloco..."
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="neigh">
              Bairro
            </label>
            <input className="form-input" id="neigh" placeholder="Centro" />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="city">
              Cidade
            </label>
            <input className="form-input" id="city" placeholder="São Paulo" />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="state">
              Estado
            </label>
            <select className="form-input" id="state" defaultValue="SC">
              <option value="">UF</option>
              {STATES.map((uf) => (
                <option key={uf} value={uf}>
                  {uf}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
