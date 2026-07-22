package com.resicore.modules.amenity.mapper;

import com.resicore.modules.amenity.dto.AmenityBookingRequestDTO;
import com.resicore.modules.amenity.dto.AmenityBookingResponseDTO;
import com.resicore.modules.amenity.dto.AmenityRequestDTO;
import com.resicore.modules.amenity.dto.AmenityResponseDTO;
import com.resicore.modules.amenity.dto.AmenitySummaryDTO;
import com.resicore.modules.amenity.entity.Amenity;
import com.resicore.modules.amenity.entity.AmenityBooking;
import org.springframework.stereotype.Component;

@Component
public class AmenityMapper {

    public Amenity toAmenityEntity(AmenityRequestDTO dto) {
        if (dto == null) return null;
        
        return Amenity.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .category(dto.getCategory())
                .location(dto.getLocation())
                .capacity(dto.getCapacity())
                .bookingRequired(dto.getBookingRequired())
                .bookingCharge(dto.getBookingCharge())
                .securityDeposit(dto.getSecurityDeposit())
                .openingTime(dto.getOpeningTime())
                .closingTime(dto.getClosingTime())
                .slotDuration(dto.getSlotDuration())
                .maxBookingsPerResidentPerDay(dto.getMaxBookingsPerResidentPerDay())
                .advanceBookingDays(dto.getAdvanceBookingDays())
                .images(dto.getImages())
                .rules(dto.getRules())
                .status(dto.getStatus())
                .build();
    }
    
    public void updateAmenityFromDto(AmenityRequestDTO dto, Amenity amenity) {
        if (dto == null || amenity == null) return;
        
        amenity.setName(dto.getName());
        amenity.setDescription(dto.getDescription());
        amenity.setCategory(dto.getCategory());
        amenity.setLocation(dto.getLocation());
        amenity.setCapacity(dto.getCapacity());
        amenity.setBookingRequired(dto.getBookingRequired());
        amenity.setBookingCharge(dto.getBookingCharge());
        amenity.setSecurityDeposit(dto.getSecurityDeposit());
        amenity.setOpeningTime(dto.getOpeningTime());
        amenity.setClosingTime(dto.getClosingTime());
        amenity.setSlotDuration(dto.getSlotDuration());
        amenity.setMaxBookingsPerResidentPerDay(dto.getMaxBookingsPerResidentPerDay());
        amenity.setAdvanceBookingDays(dto.getAdvanceBookingDays());
        amenity.setImages(dto.getImages());
        amenity.setRules(dto.getRules());
        amenity.setStatus(dto.getStatus());
    }

    public AmenityResponseDTO toAmenityResponseDTO(Amenity entity) {
        if (entity == null) return null;
        
        return AmenityResponseDTO.builder()
                .id(entity.getId())
                .amenityCode(entity.getAmenityCode())
                .societyId(entity.getSocietyId())
                .name(entity.getName())
                .description(entity.getDescription())
                .category(entity.getCategory())
                .location(entity.getLocation())
                .capacity(entity.getCapacity())
                .bookingRequired(entity.getBookingRequired())
                .bookingCharge(entity.getBookingCharge())
                .securityDeposit(entity.getSecurityDeposit())
                .openingTime(entity.getOpeningTime())
                .closingTime(entity.getClosingTime())
                .slotDuration(entity.getSlotDuration())
                .maxBookingsPerResidentPerDay(entity.getMaxBookingsPerResidentPerDay())
                .advanceBookingDays(entity.getAdvanceBookingDays())
                .images(entity.getImages())
                .rules(entity.getRules())
                .status(entity.getStatus())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
    
    public AmenitySummaryDTO toAmenitySummaryDTO(Amenity entity) {
        if (entity == null) return null;
        
        return AmenitySummaryDTO.builder()
                .id(entity.getId())
                .amenityCode(entity.getAmenityCode())
                .name(entity.getName())
                .category(entity.getCategory())
                .location(entity.getLocation())
                .capacity(entity.getCapacity())
                .status(entity.getStatus())
                .bookingCharge(entity.getBookingCharge())
                .build();
    }

    public AmenityBooking toBookingEntity(AmenityBookingRequestDTO dto) {
        if (dto == null) return null;
        
        return AmenityBooking.builder()
                .amenityId(dto.getAmenityId())
                .bookingDate(dto.getBookingDate())
                .startTime(dto.getStartTime())
                .endTime(dto.getEndTime())
                .numberOfGuests(dto.getNumberOfGuests())
                .remarks(dto.getRemarks())
                .build();
    }

    public AmenityBookingResponseDTO toBookingResponseDTO(AmenityBooking entity, String amenityName, String residentName, String flatNumber) {
        if (entity == null) return null;
        
        return AmenityBookingResponseDTO.builder()
                .id(entity.getId())
                .bookingNumber(entity.getBookingNumber())
                .amenityId(entity.getAmenityId())
                .amenityName(amenityName)
                .residentId(entity.getResidentId())
                .residentName(residentName)
                .flatId(entity.getFlatId())
                .flatNumber(flatNumber)
                .buildingId(entity.getBuildingId())
                .societyId(entity.getSocietyId())
                .bookingDate(entity.getBookingDate())
                .startTime(entity.getStartTime())
                .endTime(entity.getEndTime())
                .duration(entity.getDuration())
                .numberOfGuests(entity.getNumberOfGuests())
                .bookingCharge(entity.getBookingCharge())
                .securityDeposit(entity.getSecurityDeposit())
                .paymentId(entity.getPaymentId())
                .bookingStatus(entity.getBookingStatus())
                .paymentStatus(entity.getPaymentStatus())
                .remarks(entity.getRemarks())
                .approvedBy(entity.getApprovedBy())
                .cancelledBy(entity.getCancelledBy())
                .checkedInAt(entity.getCheckedInAt())
                .checkedOutAt(entity.getCheckedOutAt())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}
