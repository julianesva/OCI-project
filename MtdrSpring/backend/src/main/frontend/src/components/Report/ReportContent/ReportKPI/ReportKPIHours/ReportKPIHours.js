import './ReportKPIHours.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ReportKPIHours({ KPIHoursData = {} }) {
  // Proporcionar valores predeterminados para evitar errores
  const stimated_hours = KPIHoursData?.stimated_hours || 0;
  const worked_hours = KPIHoursData?.worked_hours || 0;

  // Preparar los datos para el gráfico
  const data = [
    {
      name: 'Horas',
      'Estimadas': stimated_hours,
      'Trabajadas': worked_hours,
    }
  ];

  // Calcular el porcentaje de horas trabajadas en relación a las estimadas
  const percentage = stimated_hours > 0 
    ? Math.round((worked_hours / stimated_hours) * 100) 
    : 0;

  // Determinar si estamos por encima o por debajo de las horas estimadas
  const diffHours = worked_hours - stimated_hours;
  const diffText = diffHours >= 0 
    ? `+${diffHours} horas` 
    : `${diffHours} horas`;

  return (
    <div className="report-kpi-hours-main-container">
      <h2 className="report-kpi-title">Control de Horas</h2>
      
      <div className="report-kpi-stats">
        <div className="stat-card estimated-card">
          <p className="stat-label">Horas Estimadas</p>
          <p className="stat-value estimated-value">{stimated_hours}</p>
        </div>
        
        <div className="stat-card worked-card">
          <p className="stat-label">Horas Trabajadas</p>
          <p className="stat-value worked-value">{worked_hours}</p>
        </div>
        
        <div className="stat-card difference-card">
          <p className="stat-label">Diferencia</p>
          <p className="stat-value difference-value">{diffText}</p>
        </div>
        
        <div className="stat-card percentage-card">
          <p className="stat-label">Porcentaje</p>
          <p className="stat-value percentage-value">{percentage}%</p>
        </div>
      </div>
      
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Estimadas" fill="#F59E0B" />
            <Bar dataKey="Trabajadas" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}