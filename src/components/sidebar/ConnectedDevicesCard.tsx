import React from 'react';
import { Watch, Thermometer, Scale, Check } from 'lucide-react';
import { ConnectedDevice } from '../../types/tracker';

interface ConnectedDevicesCardProps {
  devices: ConnectedDevice[];
}

export const ConnectedDevicesCard: React.FC<ConnectedDevicesCardProps> = ({
  devices,
}) => {
  const getDeviceIcon = (type: ConnectedDevice['type']) => {
    switch (type) {
      case 'watch':
        return <Watch className="w-4 h-4 text-[#A855F7]" />;
      case 'thermometer':
        return <Thermometer className="w-4 h-4 text-[#A855F7]" />;
      case 'scale':
        return <Scale className="w-4 h-4 text-[#A855F7]" />;
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-[15.6px] font-bold text-[#1F2937] leading-[23.4px] mb-2.5">
        Connected Devices
      </h3>

      <div className="space-y-2.5">
        {devices.map((device) => (
          <div
            key={device.id}
            className="flex items-center justify-between p-3 rounded-[14.4px] bg-[#F9FAFB] border-[1.2px] border-[#F3F4F6] h-[60px]"
          >
            <div className="flex items-center gap-2">
              <div className="w-[33.4px] h-[33.6px] rounded-full bg-[#F3E8FF] flex items-center justify-center shrink-0">
                {getDeviceIcon(device.type)}
              </div>
              <span className="text-[14.4px] font-medium text-[#374151]">
                {device.name}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[12px] font-semibold text-[#16A34A]">
                {device.syncedTime}
              </span>
              <div className="w-[16.7px] h-[16.8px] rounded-full bg-[#DCFCE7] flex items-center justify-center text-[#16A34A] shrink-0">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
