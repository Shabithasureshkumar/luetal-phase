import type { PatientProfile as Patient } from '../../types/tracker';
import patientPhoto from '../../assets/patient.png';

export function PatientProfile({ patient }: { patient: Patient }) {
  return (
    <aside
      aria-label="Patient profile"
      className="relative isolate flex min-h-[clamp(138px,133px_+_1.37vw,160px)] w-full overflow-hidden rounded-[clamp(18px,1.6vw,26px)] bg-gradient-to-r from-[#EC4899] to-[#F472B6] p-[clamp(12px,0.95vw,18px)] text-white shadow-glow sm:max-w-[380px]"
    >
      <div className="relative z-10 flex min-w-0 max-w-[62%] flex-col justify-center gap-0.5">
        <h2 className="truncate text-heading font-bold">{patient.name}</h2>
        <p className="text-caption text-white/85">
          Age: {patient.age} • {patient.gender}
        </p>
        <p className="text-caption text-white/85">
          Height: {patient.heightCm} cm • Weight: {patient.weightKg} kg
        </p>
        <p className="text-caption text-white/85">Cycle Length: {patient.cycleLengthDays} days (avg)</p>
        <p className="text-caption text-white/85">BMI: {patient.bmi}</p>
      </div>
      <span aria-hidden="true" className="absolute -bottom-[30%] -right-[8%] -z-0 aspect-square w-[52%] rounded-full bg-[#F9A8D4]/70" />
      <img
        src={patientPhoto}
        alt={`Photo of ${patient.name}`}
        className="absolute bottom-0 right-[2%] z-0 h-[112%] w-auto max-w-[44%] object-contain object-bottom"
      />
    </aside>
  );
}
