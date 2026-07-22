package com.resicore.modules.societyadmin.service.impl;

import com.resicore.modules.society.entity.Society;
import com.resicore.modules.society.repository.SocietyRepository;
import com.resicore.modules.societyadmin.dto.SocietySettingsRequestDTO;
import com.resicore.modules.societyadmin.dto.SocietySettingsResponseDTO;
import com.resicore.modules.societyadmin.entity.SocietySettings;
import com.resicore.modules.societyadmin.repository.SocietySettingsRepository;
import com.resicore.modules.societyadmin.service.SocietyAdminSettingsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class SocietyAdminSettingsServiceImpl implements SocietyAdminSettingsService {

    private final SocietyRepository societyRepository;
    private final SocietySettingsRepository settingsRepository;

    @Override
    public SocietySettingsResponseDTO getSettings(String societyId) {
        Society society = getSociety(societyId);
        SocietySettings settings = settingsRepository.findBySocietyId(societyId)
                .orElse(SocietySettings.builder().societyId(societyId).build());

        return SocietySettingsResponseDTO.builder()
                .societyId(society.getId())
                .societyName(society.getSocietyName())
                .contactEmail(society.getEmail())
                .contactPhone(society.getPhone())
                .workingHours(settings.getWorkingHours())
                .visitorRules(settings.getVisitorRules())
                .amenityRules(settings.getAmenityRules())
                .complaintRules(settings.getComplaintRules())
                .billingRules(settings.getBillingRules())
                .build();
    }

    @Override
    @Transactional
    public SocietySettingsResponseDTO updateSettings(String societyId, SocietySettingsRequestDTO request) {
        Society society = getSociety(societyId);
        
        if (request.getSocietyName() != null) society.setSocietyName(request.getSocietyName());
        if (request.getContactEmail() != null) society.setEmail(request.getContactEmail());
        if (request.getContactPhone() != null) society.setPhone(request.getContactPhone());
        
        societyRepository.save(society);

        SocietySettings settings = settingsRepository.findBySocietyId(societyId)
                .orElse(SocietySettings.builder().societyId(societyId).build());

        if (request.getWorkingHours() != null) settings.setWorkingHours(request.getWorkingHours());
        if (request.getVisitorRules() != null) settings.setVisitorRules(request.getVisitorRules());
        if (request.getAmenityRules() != null) settings.setAmenityRules(request.getAmenityRules());
        if (request.getComplaintRules() != null) settings.setComplaintRules(request.getComplaintRules());
        if (request.getBillingRules() != null) settings.setBillingRules(request.getBillingRules());

        settings = settingsRepository.save(settings);

        return SocietySettingsResponseDTO.builder()
                .societyId(society.getId())
                .societyName(society.getSocietyName())
                .contactEmail(society.getEmail())
                .contactPhone(society.getPhone())
                .workingHours(settings.getWorkingHours())
                .visitorRules(settings.getVisitorRules())
                .amenityRules(settings.getAmenityRules())
                .complaintRules(settings.getComplaintRules())
                .billingRules(settings.getBillingRules())
                .build();
    }
    
    private Society getSociety(String id) {
        return societyRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Society not found: " + id));
    }
}
