import { MVP_CONFIG } from "@/config/mvp";
import { formatNumericDateKey } from "@/lib/date-utils";
import type { Court, CustomerDetails, Venue } from "@/types/reservation";

export type PaymentProofRequest = {
  customer: CustomerDetails;
  venue: Venue;
  date: string;
  startsAt: string;
  court: Court;
};

export interface PaymentProofChannel {
  getSubmissionUrl(request: PaymentProofRequest): string;
}

function createWhatsAppMessage({
  customer,
  venue,
  date,
  startsAt,
  court,
}: PaymentProofRequest) {
  return [
    `Hola ${MVP_CONFIG.clubName}.`,
    "",
    "Acabo de realizar una solicitud de reserva con los siguientes datos:",
    "",
    `Nombre: ${customer.firstName} ${customer.lastName}`,
    `Teléfono: ${customer.phone}`,
    `Sucursal: ${venue.name}`,
    `Fecha: ${formatNumericDateKey(date)}`,
    `Horario: ${startsAt}`,
    `Cancha: ${court.name}`,
    "",
    "Les envío el comprobante del pago de la seña para que puedan confirmar la reserva.",
    "",
    "Muchas gracias.",
  ].join("\n");
}

export const whatsappPaymentProofChannel: PaymentProofChannel = {
  getSubmissionUrl(request) {
    const baseUrl = MVP_CONFIG.whatsappNumber
      ? `https://wa.me/${MVP_CONFIG.whatsappNumber}`
      : "https://wa.me";
    const message = encodeURIComponent(createWhatsAppMessage(request));

    return `${baseUrl}?text=${message}`;
  },
};
