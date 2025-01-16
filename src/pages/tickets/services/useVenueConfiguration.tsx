"use client";

import type { ReactNode } from "react";
import React, { createContext, useCallback, useContext, useMemo } from "react";
import { components } from "../../../services/maverick/generated/maverick-schema";

/** applied if the section id has no group or color */
const defaultColor = "#ffffff00";

/**
 * Returns a mapping of section IDs to their corresponding group colors.
 *
 * @param venueConfiguration - The venue configuration object containing groups and sections.
 * @returns The mapping of section IDs to group colors.
 */
export const useVenueConfiguration = (
  venueConfiguration?: components["schemas"]["VenueConfiguration"]
) => {
  const sectionIdToGroup: Record<
    string,
    components["schemas"]["VenueConfigurationGroup"]
  > = useMemo(() => {
    if (!venueConfiguration) {
      return {};
    }
    const { groups, sections } = venueConfiguration;
    const hash: Record<
      string,
      components["schemas"]["VenueConfigurationGroup"]
    > = {};
    for (const section of sections ?? []) {
      const group = groups?.find((group) => group.id === section.groupId);
      if (group && section.id) {
        hash[section.id] = group;
      }
    }

    return hash;
  }, [venueConfiguration]);

  /**
   * Returns the color of the group associated with the given section ID.
   */
  const getColorBySectionId = useCallback(
    (sectionId?: number) => {
      if (!sectionId) {
        return defaultColor;
      }
      return sectionIdToGroup[sectionId]?.color ?? defaultColor;
    },
    [sectionIdToGroup]
  );

  return {
    sectionIdToGroup,
    getColorBySectionId,
    venueConfiguration,
    isGeneralAdmission: venueConfiguration?.generalAdmission,
  };
};

type VenueConfigurationContextType = ReturnType<typeof useVenueConfiguration>;

const VenueConfigurationContext = createContext<
  undefined | VenueConfigurationContextType
>(undefined);

interface VenueConfigurationProviderProps {
  children: ReactNode;
  venueConfig?: components["schemas"]["VenueConfiguration"];
}

export const VenueConfigurationProvider: React.FC<
  VenueConfigurationProviderProps
> = ({ venueConfig, children }) => {
  const venuConfig = useVenueConfiguration(venueConfig);

  return (
    <VenueConfigurationContext.Provider value={venuConfig}>
      {children}
    </VenueConfigurationContext.Provider>
  );
};

/**
 * Custom hook that provides access to the group information based on section ID.
 *
 * @returns {VenueConfigurationContextType} The context object containing the section ID to group mapping and a function to get the color by section ID.
 * @throws {Error} If used outside of a GroupBySectionIdContextProvider.
 */
export const useVenueConfigurationContext =
  (): VenueConfigurationContextType => {
    const context = useContext(VenueConfigurationContext);
    if (!context) {
      throw new Error(
        "useVenueConfigurationContext must be used within a VenueConfigurationContextProvider"
      );
    }
    return context;
  };
