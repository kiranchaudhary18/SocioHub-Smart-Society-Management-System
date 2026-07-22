package com.resicore.modules.community.mapper;

import com.resicore.modules.community.dto.EventRegistrationDTO;
import com.resicore.modules.community.dto.EventRequestDTO;
import com.resicore.modules.community.dto.EventResponseDTO;
import com.resicore.modules.community.dto.NoticeRequestDTO;
import com.resicore.modules.community.dto.NoticeResponseDTO;
import com.resicore.modules.community.dto.PollOptionDTO;
import com.resicore.modules.community.dto.PollRequestDTO;
import com.resicore.modules.community.dto.PollResponseDTO;
import com.resicore.modules.community.entity.Event;
import com.resicore.modules.community.entity.EventRegistration;
import com.resicore.modules.community.entity.Notice;
import com.resicore.modules.community.entity.Poll;
import com.resicore.modules.community.entity.PollOption;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CommunityMapper {

    // --- Notice ---
    
    public Notice toNoticeEntity(NoticeRequestDTO dto) {
        if (dto == null) return null;
        
        return Notice.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .category(dto.getCategory())
                .priority(dto.getPriority())
                .attachments(dto.getAttachments())
                .expiryDate(dto.getExpiryDate())
                .isPinned(dto.getIsPinned())
                .build();
    }
    
    public void updateNoticeFromDto(NoticeRequestDTO dto, Notice notice) {
        if (dto == null || notice == null) return;
        
        notice.setTitle(dto.getTitle());
        notice.setDescription(dto.getDescription());
        notice.setCategory(dto.getCategory());
        notice.setPriority(dto.getPriority());
        notice.setAttachments(dto.getAttachments());
        notice.setExpiryDate(dto.getExpiryDate());
        notice.setIsPinned(dto.getIsPinned());
    }

    public NoticeResponseDTO toNoticeResponseDTO(Notice entity) {
        if (entity == null) return null;
        
        return NoticeResponseDTO.builder()
                .id(entity.getId())
                .noticeNumber(entity.getNoticeNumber())
                .societyId(entity.getSocietyId())
                .title(entity.getTitle())
                .description(entity.getDescription())
                .category(entity.getCategory())
                .priority(entity.getPriority())
                .attachments(entity.getAttachments())
                .publishDate(entity.getPublishDate())
                .expiryDate(entity.getExpiryDate())
                .publishedBy(entity.getPublishedBy())
                .status(entity.getStatus())
                .isPinned(entity.getIsPinned())
                .createdAt(entity.getCreatedAt())
                .build();
    }
    
    // --- Event ---

    public Event toEventEntity(EventRequestDTO dto) {
        if (dto == null) return null;
        
        return Event.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .category(dto.getCategory())
                .location(dto.getLocation())
                .startDateTime(dto.getStartDateTime())
                .endDateTime(dto.getEndDateTime())
                .registrationRequired(dto.getRegistrationRequired())
                .maxParticipants(dto.getMaxParticipants())
                .entryFee(dto.getEntryFee())
                .bannerImage(dto.getBannerImage())
                .organizer(dto.getOrganizer())
                .build();
    }

    public void updateEventFromDto(EventRequestDTO dto, Event event) {
        if (dto == null || event == null) return;
        
        event.setTitle(dto.getTitle());
        event.setDescription(dto.getDescription());
        event.setCategory(dto.getCategory());
        event.setLocation(dto.getLocation());
        event.setStartDateTime(dto.getStartDateTime());
        event.setEndDateTime(dto.getEndDateTime());
        event.setRegistrationRequired(dto.getRegistrationRequired());
        event.setMaxParticipants(dto.getMaxParticipants());
        event.setEntryFee(dto.getEntryFee());
        event.setBannerImage(dto.getBannerImage());
        event.setOrganizer(dto.getOrganizer());
    }

    public EventResponseDTO toEventResponseDTO(Event entity) {
        if (entity == null) return null;
        
        return EventResponseDTO.builder()
                .id(entity.getId())
                .eventCode(entity.getEventCode())
                .societyId(entity.getSocietyId())
                .title(entity.getTitle())
                .description(entity.getDescription())
                .category(entity.getCategory())
                .location(entity.getLocation())
                .startDateTime(entity.getStartDateTime())
                .endDateTime(entity.getEndDateTime())
                .registrationRequired(entity.getRegistrationRequired())
                .maxParticipants(entity.getMaxParticipants())
                .registeredCount(entity.getRegisteredCount())
                .entryFee(entity.getEntryFee())
                .paymentRequired(entity.getPaymentRequired())
                .bannerImage(entity.getBannerImage())
                .organizer(entity.getOrganizer())
                .status(entity.getStatus())
                .createdAt(entity.getCreatedAt())
                .build();
    }

    public EventRegistrationDTO toEventRegistrationDTO(EventRegistration entity) {
        if (entity == null) return null;
        
        return EventRegistrationDTO.builder()
                .id(entity.getId())
                .eventId(entity.getEventId())
                .residentId(entity.getResidentId())
                .registrationDate(entity.getRegistrationDate())
                .paymentId(entity.getPaymentId())
                .status(entity.getStatus())
                .checkedIn(entity.getCheckedIn())
                .checkedInAt(entity.getCheckedInAt())
                .build();
    }
    
    // --- Poll ---

    public Poll toPollEntity(PollRequestDTO dto) {
        if (dto == null) return null;
        
        List<PollOption> options = dto.getOptions().stream()
                .map(opt -> PollOption.builder().text(opt.getText()).build())
                .collect(Collectors.toList());
                
        return Poll.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .options(options)
                .multipleChoice(dto.getMultipleChoice())
                .anonymous(dto.getAnonymous())
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .build();
    }
    
    public void updatePollFromDto(PollRequestDTO dto, Poll poll) {
        if (dto == null || poll == null) return;
        
        poll.setTitle(dto.getTitle());
        poll.setDescription(dto.getDescription());
        
        // Ensure options list structure remains aligned
        List<PollOption> options = dto.getOptions().stream()
                .map(opt -> PollOption.builder().text(opt.getText()).build())
                .collect(Collectors.toList());
        poll.setOptions(options);
        
        poll.setMultipleChoice(dto.getMultipleChoice());
        poll.setAnonymous(dto.getAnonymous());
        poll.setStartDate(dto.getStartDate());
        poll.setEndDate(dto.getEndDate());
    }

    public PollResponseDTO toPollResponseDTO(Poll entity) {
        if (entity == null) return null;
        
        List<PollOptionDTO> optionDTOs = entity.getOptions().stream()
                .map(opt -> PollOptionDTO.builder().id(opt.getId()).text(opt.getText()).build())
                .collect(Collectors.toList());
        
        return PollResponseDTO.builder()
                .id(entity.getId())
                .pollCode(entity.getPollCode())
                .societyId(entity.getSocietyId())
                .title(entity.getTitle())
                .description(entity.getDescription())
                .options(optionDTOs)
                .multipleChoice(entity.getMultipleChoice())
                .anonymous(entity.getAnonymous())
                .startDate(entity.getStartDate())
                .endDate(entity.getEndDate())
                .status(entity.getStatus())
                .createdAt(entity.getCreatedAt())
                .build();
    }
}
