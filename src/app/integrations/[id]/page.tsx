'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const integrations = [
  {
    id: 'pagerduty',
    name: 'PagerDuty',
    category: 'alerting',
    description: 'Receive incidents directly in PagerDuty. AI4Bharat acts as an automated responder, investigating and resolving before your on-call engineer is paged.',
    status: 'Available',
    capabilities: [
      {
        title: 'Automated Incident Triage',
        description: 'AI4Bharat receives alerts as they come in and begins investigation immediately, often resolving issues before escalation.'
      },
      {
        title: 'Smart Escalation',
        description: 'Only escalates to human responders when autonomous resolution isn\'t possible or confidence thresholds aren\'t met.'
      },
      {
        title: 'Post-Incident Reports',
        description: 'Automatically generates detailed post-incident reports with timeline, actions taken, and recommendations.'
      },
      {
        title: 'On-Call Handoff',
        description: 'Seamlessly continues investigation across on-call rotations without losing context.'
      }
    ],
    setupSteps: [
      {
        title: 'Connect Your PagerDuty Account',
        description: 'Authenticate with PagerDuty using OAuth and grant necessary permissions for incident management.'
      },
      {
        title: 'Configure Response Rules',
        description: 'Define which services AI4Bharat should monitor and set escalation policies.'
      },
      {
        title: 'Set Confidence Thresholds',
        description: 'Choose when AI4Bharat should auto-resolve vs. escalate based on your risk tolerance.'
      },
      {
        title: 'Test with a Sample Incident',
        description: 'Run a simulated incident to verify the integration is working correctly.'
      }
    ],
    requirements: [
      'PagerDuty Professional or higher plan',
      'API access enabled on your PagerDuty account',
      'Services configured in PagerDuty'
    ]
  },
  {
    id: 'datadog',
    name: 'Datadog',
    category: 'monitoring',
    description: 'Connect to Datadog metrics, logs, and traces. AI4Bharat correlates telemetry across your entire infrastructure to pinpoint root causes.',
    status: 'Available',
    capabilities: [
      {
        title: 'Unified Telemetry',
        description: 'Correlate metrics, logs, and traces from Datadog to build complete incident context.'
      },
      {
        title: 'Anomaly Detection',
        description: 'Leverage Datadog\'s anomaly detection alongside AI4Bharat\'s reasoning for faster diagnosis.'
      },
      {
        title: 'Dashboard Integration',
        description: 'AI4Bharat can annotate your dashboards with investigation findings in real-time.'
      },
      {
        title: 'APM Correlation',
        description: 'Link distributed trace data to code-level context for precise root cause identification.'
      }
    ],
    setupSteps: [
      {
        title: 'Install Datadog Integration',
        description: 'Add AI4Bharat from the Datadog integrations marketplace with one click.'
      },
      {
        title: 'Grant Data Access',
        description: 'Configure which metrics, logs, and traces AI4Bharat can access.'
      },
      {
        title: 'Map Services',
        description: 'Connect Datadog services to your AI4Bharat service inventory.'
      },
      {
        title: 'Enable Log Analysis',
        description: 'Configure log parsing and indexing for optimal AI analysis.'
      }
    ],
    requirements: [
      'Datadog Pro or Enterprise plan',
      'APM enabled for trace data',
      'Logs configured with proper indexing'
    ]
  },
  {
    id: 'slack',
    name: 'Slack',
    category: 'communication',
    description: 'Get incident updates, investigation progress, and resolution summaries directly in Slack. The AI can respond to commands and queries.',
    status: 'Available',
    capabilities: [
      {
        title: 'Real-Time Notifications',
        description: 'Receive instant updates on incident status, investigation progress, and resolutions.'
      },
      {
        title: 'Interactive Commands',
        description: 'Use slash commands like /incident, /status, and /resolve directly in Slack.'
      },
      {
        title: 'Thread Grouping',
        description: 'Keep your channels organized with threaded incident conversations.'
      },
      {
        title: 'Incident Channel Creation',
        description: 'Automatically create dedicated Slack channels for major incidents.'
      }
    ],
    setupSteps: [
      {
        title: 'Add Slack App',
        description: 'Install the AI4Bharat Slack app from the Slack App Directory.'
      },
      {
        title: 'Authorize Permissions',
        description: 'Grant the app access to channels where you want incident notifications.'
      },
      {
        title: 'Configure Notification Preferences',
        description: 'Choose which events trigger Slack notifications and set your preferences.'
      },
      {
        title: 'Invite the Bot',
        description: 'Add @ai4bharat to any channel where you want incident updates.'
      }
    ],
    requirements: [
      'Slack workspace with admin privileges to install apps',
      'Slack channel(s) for incident notifications',
      'User accounts for team members who will interact with the bot'
    ]
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'version-control',
    description: 'AI4Bharat analyzes code history, creates pull requests with remediation, and can automatically merge approved changes.',
    status: 'Available',
    capabilities: [
      {
        title: 'Automated PR Creation',
        description: 'Generates complete pull requests with fix code, tests, and documentation.'
      },
      {
        title: 'Code Context Analysis',
        description: 'Understands your codebase structure, recent changes, and dependency relationships.'
      },
      {
        title: 'Code Review Integration',
        description: 'Participates in code review discussions and responds to reviewer comments.'
      },
      {
        title: 'Auto-Merge on Approval',
        description: 'Automatically merges PRs when all checks pass and reviews are approved.'
      }
    ],
    setupSteps: [
      {
        title: 'Install GitHub App',
        description: 'Install the AI4Bharat GitHub App with repository access permissions.'
      },
      {
        title: 'Configure Repository Access',
        description: 'Select which repositories AI4Bharat can analyze and modify.'
      },
      {
        title: 'Set Branch Protection Rules',
        description: 'Configure merge requirements and branch protection for safety.'
      },
      {
        title: 'Define Auto-Merge Policies',
        description: 'Choose criteria for automatic merging based on your team\'s workflow.'
      }
    ],
    requirements: [
      'GitHub organization or account with repository access',
      'Branch protection rules configured',
      'CI/CD pipeline for automated testing'
    ]
  },
  {
    id: 'jenkins',
    name: 'Jenkins',
    category: 'deployment',
    description: 'Trigger rollbacks, deploy known-good configurations, and coordinate deployment workflows during incident response.',
    status: 'Available',
    capabilities: [
      {
        title: 'Automated Rollbacks',
        description: 'Trigger immediate rollbacks to the last known good deployment when issues are detected.'
      },
      {
        title: 'Deployment Coordination',
        description: 'Coordinate deployments and ensure consistency across your infrastructure.'
      },
      {
        title: 'Pipeline Integration',
        description: 'Integrates with Jenkins pipelines to execute custom remediation workflows.'
      },
      {
        title: 'Build Status Monitoring',
        description: 'Monitors build status and can pause/resume pipelines based on incident state.'
      }
    ],
    setupSteps: [
      {
        title: 'Install Jenkins Plugin',
        description: 'Install the AI4Bharat plugin from the Jenkins plugin registry.'
      },
      {
        title: 'Configure API Access',
        description: 'Set up API tokens for AI4Bharat to communicate with Jenkins.'
      },
      {
        title: 'Define Rollback Procedures',
        description: 'Configure rollback jobs and the conditions that trigger them.'
      },
      {
        title: 'Test the Integration',
        description: 'Run a test incident to verify rollback automation works correctly.'
      }
    ],
    requirements: [
      'Jenkins 2.x or later',
      'Pipeline-capable Jenkins setup',
      'API token for authentication'
    ]
  },
  {
    id: 'grafana',
    name: 'Grafana',
    category: 'monitoring',
    description: 'Visualize incident context alongside your existing dashboards. AI4Bharat annotations show exactly when and why interventions occurred.',
    status: 'Available',
    capabilities: [
      {
        title: 'Incident Annotations',
        description: 'Automatically annotate graphs with investigation findings and actions taken.'
      },
      {
        title: 'Dashboard Embedding',
        description: 'Embed AI4Bharat context directly into your existing Grafana dashboards.'
      },
      {
        title: 'Alert Correlation',
        description: 'Correlate Grafana alerts with AI4Bharat investigations for better context.'
      },
      {
        title: 'Custom Visualizations',
        description: 'Create custom panels showing AI4Bharat metrics and incident history.'
      }
    ],
    setupSteps: [
      {
        title: 'Install Grafana Plugin',
        description: 'Add AI4Bharat from the Grafana plugin catalog.'
      },
      {
        title: 'Connect Data Sources',
        description: 'Link your Prometheus, InfluxDB, or other data sources.'
      },
      {
        title: 'Configure Annotation Streams',
        description: 'Set up automatic annotation for AI4Bharat events.'
      },
      {
        title: 'Create Dashboard Panels',
        description: 'Build custom panels to visualize AI4Bharat insights.'
      }
    ],
    requirements: [
      'Grafana 8.x or later',
      'At least one data source configured',
      'Admin access to install plugins'
    ]
  },
  {
    id: 'opsgenie',
    name: 'Opsgenie',
    category: 'alerting',
    description: 'Alternative alerting destination with intelligent routing. AI4Bharat receives alerts alongside your existing responders.',
    status: 'Available',
    capabilities: [
      {
        title: 'Alert Forwarding',
        description: 'Receive AI4Bharat alerts directly in Opsgenie with full context.'
      },
      {
        title: 'Schedule Integration',
        description: 'Understands on-call schedules and routes appropriately.'
      },
      {
        title: 'Action Buttons',
        description: 'Quick action buttons to acknowledge, escalate, or resolve from Opsgenie.'
      },
      {
        title: 'Heartbeat Monitoring',
        description: 'Monitors service health and creates alerts on heartbeat failures.'
      }
    ],
    setupSteps: [
      {
        title: 'Create Opsgenie Integration',
        description: 'Add AI4Bharat as a new integration in your Opsgenie account.'
      },
      {
        title: 'Configure API Key',
        description: 'Generate an API key for AI4Bharat to send alerts.'
      },
      {
        title: 'Set Up Routing Rules',
        description: 'Configure how alerts are routed based on severity and service.'
      },
      {
        title: 'Add Team Recipients',
        description: 'Configure which teams receive AI4Bharat notifications.'
      }
    ],
    requirements: [
      'Opsgenie Standard, Pro, or Enterprise plan',
      'API access enabled',
      'Teams and escalation policies configured'
    ]
  },
  {
    id: 'jira',
    name: 'Jira',
    category: 'incident',
    description: 'Automatically create Jira tickets for unresolved incidents. Link AI findings directly to existing tickets for seamless handoffs.',
    status: 'Available',
    capabilities: [
      {
        title: 'Ticket Automation',
        description: 'Automatically create Jira tickets when incidents can\'t be fully resolved.'
      },
      {
        title: 'Issue Linking',
        description: 'Link AI findings to existing Jira issues for complete context.'
      },
      {
        title: 'Sprint Integration',
        description: 'Add resolved issues to sprints for backlog grooming.'
      },
      {
        title: 'Custom Workflows',
        description: 'Integrate with your existing Jira workflows and automation rules.'
      }
    ],
    setupSteps: [
      {
        title: 'Connect Jira Account',
        description: 'Authenticate with Jira using OAuth and select your site.'
      },
      {
        title: 'Configure Project Mapping',
        description: 'Map AI4Bharat incident types to Jira projects.'
      },
      {
        title: 'Set Issue Templates',
        description: 'Define how AI4Bharat findings should be formatted as Jira issues.'
      },
      {
        title: 'Configure Workflow Triggers',
        description: 'Set up triggers for when tickets should be created automatically.'
      }
    ],
    requirements: [
      'Jira Software Cloud or Data Center',
      'Project with appropriate issue types configured',
      'Admin access for OAuth configuration'
    ]
  },
  {
    id: 'splunk',
    name: 'Splunk',
    category: 'monitoring',
    description: 'Query historical logs and correlate with current metrics. AI4Bharat uses Splunk data for comprehensive root cause analysis.',
    status: 'Available',
    capabilities: [
      {
        title: 'Historical Log Analysis',
        description: 'Query historical log data to understand incident patterns over time.'
      },
      {
        title: 'SIEM Integration',
        description: 'Correlate security events with operational data for security incidents.'
      },
      {
        title: 'Custom Dashboards',
        description: 'Create Splunk dashboards powered by AI4Bharat insights.'
      },
      {
        title: 'Alert Correlation',
        description: 'Correlate Splunk alerts with AI4Bharat investigation findings.'
      }
    ],
    setupSteps: [
      {
        title: 'Install Splunk Add-on',
        description: 'Install the AI4Bharat Splunk Add-on from Splunkbase.'
      },
      {
        title: 'Configure HEC',
        description: 'Set up HTTP Event Collector for data ingestion.'
      },
      {
        title: 'Configure Index Access',
        description: 'Grant AI4Bharat access to relevant Splunk indexes.'
      },
      {
        title: 'Set Up Saved Searches',
        description: 'Configure saved searches to feed into AI4Bharat.'
      }
    ],
    requirements: [
      'Splunk Enterprise 8.x or Splunk Cloud',
      'HEC (HTTP Event Collector) enabled',
      'Indexes with appropriate data'
    ]
  },
  {
    id: 'linear',
    name: 'Linear',
    category: 'collaboration',
    description: 'Create Linear issues from incidents with pre-filled context. Link resolutions to issues for complete audit trails.',
    status: 'Available',
    capabilities: [
      {
        title: 'Issue Creation',
        description: 'Automatically create Linear issues from unresolved incidents.'
      },
      {
        title: 'Context Preservation',
        description: 'All incident context, findings, and resolution steps are captured.'
      },
      {
        title: 'Cycle Integration',
        description: 'Add incident-related issues to Linear cycles for tracking.'
      },
      {
        title: 'Label Mapping',
        description: 'Map incident types to Linear labels automatically.'
      }
    ],
    setupSteps: [
      {
        title: 'Connect Linear Workspace',
        description: 'Authenticate with Linear using OAuth.'
      },
      {
        title: 'Configure Team Mapping',
        description: 'Map AI4Bharat teams to Linear teams.'
      },
      {
        title: 'Set Issue Templates',
        description: 'Define how incident data translates to Linear issues.'
      },
      {
        title: 'Configure Labels',
        description: 'Set up label mapping between incident types and Linear labels.'
      }
    ],
    requirements: [
      'Linear account with workspace admin access',
      'Teams and labels configured',
      'API access enabled'
    ]
  },
  {
    id: 'gitlab',
    name: 'GitLab',
    category: 'version-control',
    description: 'Full integration with GitLab CI/CD pipelines. AI4Bharat can create merge requests, run pipelines, and merge approved changes.',
    status: 'Coming Soon',
    capabilities: [
      {
        title: 'Merge Request Creation',
        description: 'Automatically create merge requests with fix code and documentation.'
      },
      {
        title: 'Pipeline Integration',
        description: 'Trigger and monitor GitLab CI/CD pipelines from AI4Bharat.'
      },
      {
        title: 'Code Review',
        description: 'Participate in merge request discussions and address feedback.'
      },
      {
        title: 'Auto-Merge',
        description: 'Automatically merge approved changes when pipelines pass.'
      }
    ],
    setupSteps: [
      {
        title: 'Install GitLab App',
        description: 'Install AI4Bharat from the GitLab marketplace.'
      },
      {
        title: 'Grant Repository Access',
        description: 'Configure which repositories AI4Bharat can access.'
      },
      {
        title: 'Set Up CI/CD Integration',
        description: 'Connect to GitLab CI/CD for pipeline execution.'
      },
      {
        title: 'Configure Merge Rules',
        description: 'Define merge approval and auto-merge policies.'
      }
    ],
    requirements: [
      'GitLab Premium or Ultimate',
      'CI/CD pipelines configured',
      'Maintainer access for integration setup'
    ]
  },
  {
    id: 'prometheus',
    name: 'Prometheus',
    category: 'monitoring',
    description: 'Pull metrics directly from Prometheus. AI4Bharat understands your metric relationships and alert thresholds.',
    status: 'Available',
    capabilities: [
      {
        title: 'Metric Retrieval',
        description: 'Query Prometheus for any metrics to build incident context.'
      },
      {
        title: 'Alert Understanding',
        description: 'Understands Prometheus alerting rules and thresholds.'
      },
      {
        title: 'Historical Analysis',
        description: 'Query historical metrics to identify patterns and anomalies.'
      },
      {
        title: 'PromQL Support',
        description: 'Execute complex PromQL queries for detailed analysis.'
      }
    ],
    setupSteps: [
      {
        title: 'Configure Prometheus Connection',
        description: 'Provide Prometheus endpoint URL and authentication details.'
      },
      {
        title: 'Set Up Metrics Access',
        description: 'Configure which metric namespaces AI4Bharat can query.'
      },
      {
        title: 'Import Alert Rules',
        description: 'Import existing Prometheus alerting rules.'
      },
      {
        title: 'Configure Scrape Interval',
        description: 'Set up how frequently AI4Bharat pulls metrics.'
      }
    ],
    requirements: [
      'Prometheus 2.x or later',
      'Prometheus accessible via HTTP/HTTPS',
      'Metrics endpoint exposed for AI4Bharat'
    ]
  }
];

const categoryLabels: Record<string, string> = {
  monitoring: 'Monitoring',
  alerting: 'Alerting',
  communication: 'Communication',
  incident: 'Incident Management',
  collaboration: 'Collaboration',
  'version-control': 'Version Control',
  deployment: 'Deployment'
};

export default function IntegrationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const integration = integrations.find(i => i.id === id);
  
  if (!integration) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="integration-detail-page">
        <section className="integration-detail-hero">
          <div className="container">
            <Link href="/integrations" className="back-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              All Integrations
            </Link>
            <div className="integration-detail-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="3"/>
                <path d="M9 12h6M12 9v6"/>
              </svg>
            </div>
            <h1 className="display-xl gradient-text">{integration.name}</h1>
            <p className="body-lg" style={{ maxWidth: '600px', margin: '16px auto 0' }}>
              {integration.description}
            </p>
            <div className="integration-detail-meta">
              <span className="integration-category-badge">{categoryLabels[integration.category]}</span>
              <span className={`integration-status-badge ${integration.status !== 'Available' ? 'pending' : ''}`}>
                {integration.status}
              </span>
            </div>
          </div>
        </section>

        <section className="detail-capabilities">
          <div className="container">
            <h2 className="display-md">Capabilities</h2>
            <div className="capabilities-grid">
              {integration.capabilities.map((cap, i) => (
                <div key={i} className="capability-card">
                  <h3>{cap.title}</h3>
                  <p>{cap.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="detail-setup">
          <div className="container">
            <h2 className="display-md">Setup Instructions</h2>
            <div className="setup-steps">
              {integration.setupSteps.map((step, i) => (
                <div key={i} className="setup-step">
                  <span className="setup-step-number">{i + 1}</span>
                  <div className="setup-step-content">
                    <h4>{step.title}</h4>
                    <p>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="detail-requirements">
          <div className="container">
            <h2 className="display-md">Requirements</h2>
            <div className="requirements-list">
              {integration.requirements.map((req, i) => (
                <div key={i} className="requirement-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="integration-detail-cta">
          <div className="container">
            <div className="cta-card">
              <h2 className="display-md gradient-text">Ready to connect {integration.name}?</h2>
              <p>Get started with AI4Bharat and integrate {integration.name} into your incident response workflow.</p>
              <div className="cta-buttons">
                <Link href="/briefing" className="btn btn-primary btn-lg">Schedule Setup Call</Link>
                <Link href="/integrations" className="btn btn-outline btn-lg">View All Integrations</Link>
                <Link href="/changelog" className="btn btn-ghost btn-lg">View Changelog</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
